/**
 * Deletes a relationship between palette and user.
 * Returns the number of rows deleted.
 */

 DELETE FROM Palette_User_Favorite
   WHERE user_id = ${user_id}
   AND palette_id = ${palette_id}
   RETURNING *;
