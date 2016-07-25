/**
 *  POST to create a new user.
 *  Returns the new user.
 */

INSERT INTO users (full_name, username, email)
  VALUES (
    -- These are arguments passed in by the HTTP handler.
    ${full_name}, ${username}, ${email}
  )
  -- Returns the created user.
  RETURNING *
