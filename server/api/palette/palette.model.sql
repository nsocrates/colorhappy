/*
    Creates table Palettes.
    NOTE: We only add schema here to demonstrate the ability of class QueryFile
    to pre-format SQL with static formatting parameters when needs to be.
*/

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

ALTER TABLE Palettes
  ADD CONSTRAINT view_count CHECK (view_count >= 0);

ALTER TABLE Palettes
  ADD CONSTRAINT favorite_count CHECK (favorite_count >= 0);

ALTER TABLE Palettes
  ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users (id)
  MATCH FULL ON DELETE CASCADE;
