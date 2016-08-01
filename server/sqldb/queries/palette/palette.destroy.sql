/**
 *  Delete a palette from the table.
 */

DELETE FROM Palettes
  WHERE palette_id = ${palette_id}
  AND user_id = ${user_id}
  RETURNING *;
