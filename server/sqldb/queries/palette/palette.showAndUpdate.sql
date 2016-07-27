/**
 * Show a palette and increment its view count.
 */

UPDATE Palettes
  SET view_count = view_count + 1
  WHERE id = ${id}
  RETURNING *;
