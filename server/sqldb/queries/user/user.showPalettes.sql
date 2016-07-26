/**
 * Show a user's palettes.
 */

SELECT * FROM Palettes
  WHERE user_id = ${id};
