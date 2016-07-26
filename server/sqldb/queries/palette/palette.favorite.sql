/**
 *  Creates a favorite relationshiop between user and palette.
 *  Returns a row of the relationship.
 */

INSERT INTO Palette_User_Favorite (palette_id, user_id)
  VALUES (${palette_id}, ${user_id})
  RETURNING *;
