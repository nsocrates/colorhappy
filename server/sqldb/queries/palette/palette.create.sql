/**
 *  Creates a new palette.
 *  Returns the new palette.
 */

INSERT INTO palettes (user_id, title, description, colors)
  VALUES (
    -- These are arguments passed in by the HTTP handler.
    ${user_id}, ${title}, ${description}, ${colors}
  )
  -- Returns the created palette.
  RETURNING *
