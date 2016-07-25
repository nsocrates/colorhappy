/**
 *  Creates a favorite relationshiop between user and palette.
 *  Returns the relationship.
 */

INSERT INTO palette_favoriters (palette_id, user_id)
  VALUES (${palette_id}, ${user_id})
  RETURNING *
