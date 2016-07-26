-- ######################
-- # Palettes
-- ######################

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
  ADD CONSTRAINT view_count CHECK (view_count >= 0),
  ADD CONSTRAINT favorite_count CHECK (favorite_count >= 0),
  ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users (id)
    MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;

CREATE TRIGGER increment_palette_count
  AFTER INSERT OR UPDATE OR DELETE ON Palettes
  FOR EACH ROW EXECUTE PROCEDURE trigger_increment(Users, palette_count, user_id, id);
