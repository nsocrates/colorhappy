/**
 * Show palettes favorited by user
 */

Select p.*
  FROM Palette_User_Favorite AS r
  INNER JOIN Palettes AS p
    ON r.palette_id = p.id
    WHERE r.user_id = ${id};
