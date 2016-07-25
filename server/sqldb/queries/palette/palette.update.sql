/**
 * Updates a single palette.
 * Returns the new palette.
 */

UPDATE palettes
  SET title = ${title}
      description = ${description}
      colors = ${colors}
  WHERE id = ${id}
  AND user_id = ${user_id}
  RETURNING *
