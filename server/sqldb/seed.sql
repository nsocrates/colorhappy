DROP DATABASE IF EXISTS colorhappy;
CREATE DATABASE colorhappy;

\c colorhappy;

-- ######################
-- # Func
-- ######################

CREATE OR REPLACE FUNCTION next_id()
  RETURNS varchar AS $$
    DECLARE
      time_component bigint;
      machine_id int := FLOOR(random() * 16777215);
      process_id int;
      seq_id bigint := FLOOR(random() * 16777215);
      result varchar:= '';
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


-- ######################
-- # Users
-- ######################

CREATE TABLE users (
  id varchar(24) PRIMARY KEY NOT NULL default next_id(),
  full_name text NOT NULL,
  username text NOT NULL UNIQUE,
  email text NOT NULL UNIQUE,
  palette_count integer DEFAULT 0
);

ALTER TABLE users
  ADD CONSTRAINT palette_count CHECK (palette_count >= 0);


-- ######################
-- # Palettes
-- ######################

CREATE TABLE palettes (
  id varchar(24) PRIMARY KEY NOT NULL default next_id(),
  user_id varchar(24) NOT NULL,
  title text DEFAULT 'My New Palette',
  description text NULL,
  colors text ARRAY[5] NOT NULL,
  view_count integer DEFAULT 0,
  favorite_count integer DEFAULT 0,
  created_at timestamptz DEFAULT current_timestamp
);

ALTER TABLE palettes
  ADD CONSTRAINT view_count CHECK (view_count >= 0);

ALTER TABLE palettes
  ADD CONSTRAINT favorite_count CHECK (favorite_count >= 0);

ALTER TABLE palettes
  ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users (id)
  MATCH FULL ON DELETE CASCADE;


-- ######################
-- # Palette's Favoriters
-- ######################

-- Contains favorites relation data.
CREATE TABLE palette_favoriters (
  palette_id varchar(24) NOT NULL,
  user_id varchar(24) NOT NULL,
  PRIMARY KEY (palette_id, user_id)
);

  -- palette_id is FOREIGN KEY with REFERENCE to palettes.palette_id
ALTER TABLE palette_favoriters
  ADD CONSTRAINT palette_fk FOREIGN KEY (palette_id) REFERENCES palettes (id)
  MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;

  -- user_id is FOREIGN KEY with REFERENCE to users.user_id
ALTER TABLE palette_favoriters
  ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users (id)
  MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


-- #######################
-- # Seed Data
-- #######################

-- ## Users
-- ##############
INSERT INTO users (id, full_name, username, email)
  VALUES (
    'a00000000000000000000001',
    'ColorHappy',
    'Color Happy',
    'ch@this.com'
  ), (
    'a00000000000000000000002',
    'Julia',
    'J Maestro',
    'julia@site.com'
  );

-- ## Palettes
-- ##############
INSERT INTO palettes (id, user_id, title, description, colors)
  VALUES (
    '10000000000000000000000a',
    'a00000000000000000000001',
    'Lambs on Doors',
    'From COLOURlovers',
    ARRAY['DD002C', 'DD8395', 'DDC9A7', '958871', '533817']
  ), (
    '10000000000000000000000b',
    'a00000000000000000000001',
    'My New Palette',
    'From COLOURlovers',
    ARRAY['DD002C', 'DD8395', 'DDC9A7', '958871', '533817']
  );

-- ## Palette Favoriters
-- ###########################
INSERT INTO palette_favoriters (palette_id, user_id)
  VALUES (
    '10000000000000000000000a', 'a00000000000000000000002'
  ), (
    '10000000000000000000000b', 'a00000000000000000000002'
  );
