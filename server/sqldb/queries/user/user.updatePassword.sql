/**
 * Update a user's password.
 */

UPDATE Users
  SET password_hash = gen_hash($new_password)
  WHERE id = ${id}
  AND password_hash = crypt(${old_password}, password_hash)
  RETURNING *;
