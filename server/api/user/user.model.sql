-- ######################
-- # Users
-- ######################

CREATE DOMAIN status AS text
  CHECK (VALUE ~ 'user' OR VALUE ~ 'admin');

CREATE TABLE Users (
  id varchar(24) PRIMARY KEY NOT NULL default next_id(),
  password_hash text NOT NULL,
  role status default 'user',
  name text NULL,
  username text NOT NULL UNIQUE,
  email text NOT NULL UNIQUE,
  location text NULL,
  website text NULL,
  bio text NULL,
  palette_count integer DEFAULT 0
);

ALTER TABLE Users
  ADD CONSTRAINT palette_count CHECK (palette_count >= 0),
  ADD CONSTRAINT username CHECK (char_length(username) >= 3);

CREATE UNIQUE INDEX ON Users (LOWER(username));
CREATE UNIQUE INDEX ON Users (LOWER(email));
