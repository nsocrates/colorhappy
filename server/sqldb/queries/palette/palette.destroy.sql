/**
 *  Delete a palette from the table.
 */

DELETE FROM palettes
  WHERE id = ${id}
  AND user_id = ${user_id}
