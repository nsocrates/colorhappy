/**
 * Updates a single palette.
 * Returns the new palette.
 */

UPDATE Palettes
  SET title = ${title}
      description = ${description}
      colors = ${colors}
  WHERE palette_id = ${palette_id}
  AND user_id = ${user_id}
  RETURNING *;
