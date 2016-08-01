/**
 * Deletes a relationship between palette and user.
 * Returns details of the deleted row.
 */

 DELETE FROM Palette_User_Favorite
   WHERE user_id = ${user_id}
   AND palette_id = ${palette_id}
   RETURNING *;
