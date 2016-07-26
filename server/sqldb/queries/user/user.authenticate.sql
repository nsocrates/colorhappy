/**
 * Autheticates the user
 */

SELECT * FROM Users
  -- Check both username and email fields, since they should be unique.
  WHERE LOWER(username) = LOWER(${username})
  OR LOWER(email) = LOWER(${username})
  -- crypt is a function from pgcrypto; should have been created on init.
  AND password_hash = crypt(${password}, password_hash);
