/**
 * Index palettes attached with username and user_id.
 * Offset based pagination - we can do calculations client-side...
 */

SELECT * FROM v_Palette_User
  ORDER BY ${sort~}
  OFFSET ${page}
  LIMIT ${limit};
