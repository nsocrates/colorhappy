/**
 * Show a palette and increment its view count.
 */

-- Update the Palette first, since updating views will not affect the table.
UPDATE Palettes
  SET view_count = view_count + 1
  WHERE id = ${id};

SELECT * FROM v_Palette_User
  WHERE id = ${id};
