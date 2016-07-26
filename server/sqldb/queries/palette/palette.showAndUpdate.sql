/**
 * Show a palette and increment its view count.
 */

UPDATE Palettes
  SET view_count = view_count + 1
  WHERE palette_id = ${palette_id}
  RETURNING *;
