DROP DATABASE IF EXISTS colorhappy;
CREATE DATABASE colorhappy;

\c colorhappy;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ###################################################
-- # Generates random mongo-like OID
-- # ================================================
-- ## https://gist.github.com/jamarparris/6100413
-- ###################################################
CREATE OR REPLACE FUNCTION next_id()
  RETURNS varchar AS $$
    DECLARE
      time_component bigint;
      machine_id int := FLOOR(random() * 16777215);
      process_id int;
      seq_id bigint := FLOOR(random() * 16777215);
      result varchar := '';
    BEGIN
      SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp())) INTO time_component;
      SELECT pg_backend_pid() INTO process_id;

      result := result || lpad(to_hex(time_component), 8, '0');
      result := result || lpad(to_hex(machine_id), 6, '0');
      result := result || lpad(to_hex(process_id), 4, '0');
      result := result || lpad(to_hex(seq_id), 6, '0');
      RETURN result;
    END;
  $$ LANGUAGE PLPGSQL;


-- ###################################################
-- # Generates a hash
-- ###################################################
CREATE OR REPLACE FUNCTION gen_hash(psword text)
  RETURNS text AS $$
    DECLARE
      result text;
    BEGIN
      result := crypt(psword, gen_salt('bf', '8'));
      RETURN result;
    END;
  $$ LANGUAGE plpgsql;


-- #########################################################################
-- # Increments counts on trigger operations
-- # -----------------------------------------------------------------------
-- # https://github.com/shuber/postgres-twitter/blob/master/development.sql
-- #########################################################################
CREATE OR REPLACE FUNCTION perform_increment(
  table_name text,
  column_name text,
  pk_name text,
  pk_value varchar,
  step integer
)
  RETURNS VOID AS $$
    DECLARE
      table_name text := quote_ident(table_name);
      column_name text := quote_ident(column_name);
      conditions text := ' WHERE ' || quote_ident(pk_name) || ' = $1';
      updates text := column_name || '=' || column_name || '+' || step;
    BEGIN
      -- UPDATE [table] SET [counter (+/-)= counter] WHERE [id] = ${id}
      EXECUTE 'UPDATE ' || table_name || ' SET ' || updates || conditions
      USING pk_value;
    END;
  $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trigger_increment()
  RETURNS trigger AS $$
    DECLARE
       -- Target
      table_name text := quote_ident(TG_ARGV[0]);
      -- Field to increment
      counter_name text := quote_ident(TG_ARGV[1]);
      -- Field referencing target pk
      fk_name text := quote_ident(TG_ARGV[2]);
      --Id field of our target table
      pk_name text := quote_ident(TG_ARGV[3]);
      fk_changed boolean;
      fk_value varchar;
      record record;
    BEGIN
      IF TG_OP = 'UPDATE' THEN
        record := NEW;

        /**
         * Check if the data of OLD [table].[column] matches NEW [table].[column]
         * and assign a true/false value into variable fk_changed.
         */
        -- In our case, the table will be the target ref and the column will be its
        -- primary key field, which the current table is referencing in the foreign key
        -- field.
        EXECUTE 'SELECT ($1).' || fk_name || ' != ' || '($2).' || fk_name
        INTO fk_changed
        -- Variables OLD and NEW should never coexist, so the operations below should execute.
        USING OLD, NEW;
      END IF;

      /**
       * 1. Database row to use.
       * 2. SELECT the PRIMARY KEY field of our target table.
       * 3. Call our increment fn
       */
      IF TG_OP = 'DELETE' OR (TG_OP = 'UPDATE' AND fk_changed) THEN
        -- 1
        record := OLD;
        -- 2
        EXECUTE 'SELECT ($1).' || fk_name INTO fk_value USING record;
        -- 3
        PERFORM perform_increment(table_name, counter_name, pk_name, fk_value, -1);
      END IF;

      IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND fk_changed) THEN
        -- 1
        record := NEW;
        -- 2
        EXECUTE 'SELECT ($1).' || fk_name INTO fk_value USING record;
        -- 3
        PERFORM perform_increment(table_name, counter_name, pk_name, fk_value, 1);
      END IF;

      RETURN record;
    END;
  $$ LANGUAGE plpgsql;


-- ######################################################################
-- # Users
-- ######################################################################

CREATE DOMAIN status AS text
  CHECK (VALUE ~ 'user' OR VALUE ~ 'admin');

CREATE TABLE Users (
  id varchar(24) PRIMARY KEY NOT NULL default next_id(),
  password_hash text NOT NULL,
  role_status status default 'user',
  full_name text NULL,
  username text NOT NULL UNIQUE,
  email text NOT NULL UNIQUE,
  loc text NULL,
  website text NULL,
  bio text NULL,
  palette_count integer DEFAULT 0,
  favorite_count integer DEFAULT 0,
  created_at timestamptz DEFAULT current_timestamp
);

-- User View without password_hash
CREATE VIEW v_User AS
  SELECT id, full_name, username, email, loc, website, bio, palette_count, favorite_count
  FROM Users;

ALTER TABLE Users
  ADD CONSTRAINT user_palettes CHECK (palette_count >= 0),
  ADD CONSTRAINT user_favorites CHECK (favorite_count >= 0),
  ADD CONSTRAINT username CHECK (char_length(username) >= 3 AND char_length(username) <= 15);

-- Index the lowercase values of username and email so that we can
-- use them in our queries.
-- i.e. SELECT * FROM Users WHERE LOWER([username]) = LOWER(${[username]})
CREATE UNIQUE INDEX ON Users (LOWER(username));
CREATE UNIQUE INDEX ON Users (LOWER(email));


-- ###################################################################
-- # Palettes
-- ###################################################################

CREATE TABLE Palettes (
  id varchar(24) PRIMARY KEY NOT NULL default next_id(),
  user_id varchar(24) NOT NULL,
  title text DEFAULT 'My New Palette',
  description text NULL,
  colors text ARRAY[5] NOT NULL,
  view_count integer DEFAULT 0,
  favorite_count integer DEFAULT 0,
  created_at timestamptz DEFAULT current_timestamp
);

-- Attach User object to Palette
CREATE VIEW v_Palette_User AS
  -- This will nest User inside Palette
  SELECT p.*, row_to_json(u.*) as "user"
    FROM Palettes AS p
    INNER JOIN v_User AS u
      ON p.user_id = u.id;

ALTER TABLE Palettes
  ADD CONSTRAINT palette_view CHECK (view_count >= 0),
  ADD CONSTRAINT palette_favorite CHECK (favorite_count >= 0),
  ADD CONSTRAINT palette_title CHECK (char_length(title) <= 25),
  ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users (id)
    MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;

CREATE TRIGGER increment_user_palette_count
  AFTER INSERT OR UPDATE OR DELETE ON Palettes
  FOR EACH ROW EXECUTE PROCEDURE trigger_increment(Users, palette_count, user_id, id);


-- ###########################################################
-- # Palette / User / Favorite
-- ###########################################################

-- Contains User Favorite / Palette relationship data.
CREATE TABLE Palette_User_Favorite (
  palette_id varchar(24) NOT NULL,
  user_id varchar(24) NOT NULL,
  PRIMARY KEY (palette_id, user_id)
);

ALTER TABLE Palette_User_Favorite
  -- palette_id is FOREIGN KEY with REFERENCE to palettes.id
  ADD CONSTRAINT palette_fk FOREIGN KEY (palette_id) REFERENCES palettes (id)
    MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE,

  -- user_id is FOREIGN KEY with REFERENCE to users.id
  ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users (id)
    MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;

-- Trigger to increment Palette.favorite_count
CREATE TRIGGER increment_palette_favorite_count
  AFTER INSERT OR UPDATE OR DELETE ON Palette_User_Favorite
  FOR EACH ROW EXECUTE PROCEDURE trigger_increment(Palettes, favorite_count, palette_id, id);

-- Trigger to increment User.favorite_count
CREATE TRIGGER increment_user_favorite_count
  AFTER INSERT OR UPDATE OR DELETE ON Palette_User_Favorite
  FOR EACH ROW EXECUTE PROCEDURE trigger_increment(Users, favorite_count, user_id, id);
