/**
 * Show a user's palettes.
 */

SELECT * FROM v_Palette_User
  WHERE user_id = ${id}
  ORDER BY ${sort~}
  OFFSET ${page}
  LIMIT ${limit};
