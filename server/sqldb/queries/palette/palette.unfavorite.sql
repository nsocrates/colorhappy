/**
 * Deletes a relationship between palette and user
 */

 DELETE FROM palettes
   WHERE user_id = ${user_id}
   AND palette_id = ${palette_id}
