/**
 * Creates a new User into the table.
 */

INSERT INTO Users (username, email, password_hash)
  VALUES (
    -- These are arguments passed in by the HTTP handler.
    -- gen_hash is a function defined on init.
    ${username}, ${email}, gen_hash(${password})
  )
  -- Returns the created user.
  RETURNING *
