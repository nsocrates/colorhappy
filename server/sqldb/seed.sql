-- ##############################################################
-- # Seed Data
-- ##############################################################

-- ## Drop all tables.
-- ==========================
DROP TABLE IF EXISTS Users, Palettes, Palette_User_Favorite CASCADE;

-- ## Users
-- ### Password = '123'
-- ===============================================================
INSERT INTO Users (id, full_name, username, email, password_hash)
  VALUES (
    'u00000000000000000000001',
    'Color Happy',
    'ColorHappy',
    'ch@this.com',
    gen_hash('123')
  ), (
    'u00000000000000000000002',
    'J Maestro',
    'julia',
    'julia@site.com',
    gen_hash('123')
  );

INSERT INTO Users (username, email, password_hash)
  VALUES ('mee', 'me@me.com', gen_hash('123'));

-- ## Palettes
-- =============================================================
INSERT INTO Palettes (id, user_id, title, description, colors)
  VALUES (
    'c00000000000000000000001',
    'u00000000000000000000001',
    'Lambs on Doors',
    'From COLOURlovers',
    ARRAY['DD002C', 'DD8395', 'DDC9A7', '958871', '533817']
  ), (
    'c00000000000000000000002',
    'u00000000000000000000001',
    'My New Palette',
    'From COLOURlovers',
    ARRAY['DD002C', 'DD8395', 'DDC9A7', '958871', '533817']
  ), (
    'c00000000000000000000003',
    'u00000000000000000000001',
    'i demand a pancake',
    'From COLOURlovers',
    ARRAY['594F4F', '547980', '45ADA8', '9DE0AD', 'E5FCC2']
  ), (
    'c00000000000000000000004',
    'u00000000000000000000001',
    'Giant Goldfish',
    'From COLOURlovers',
    ARRAY['69D2E7', 'A7DBD8', 'E0E4CC', 'F38630', 'FA6900']
  ), (
    'c00000000000000000000005',
    'u00000000000000000000001',
    'let them eat cake',
    'From COLOURlovers',
    ARRAY['774F38', 'E08E79', 'F1D4AF', 'ECE5CE', 'C5E0DC']
  ), (
    'c00000000000000000000006',
    'u00000000000000000000001',
    'vintage card',
    'From Adobe Kuler',
    ARRAY['5C4B51', '8CBEB2', 'F2EBBF', 'F3B562', 'F06060']
  ), (
    'c00000000000000000000007',
    'u00000000000000000000002',
    'Happy Mom',
    'From Adobe Kuler',
    ARRAY['3FB8AF', '79BAAF', 'DAFFA7', 'FFA09D', 'FF5F60']
  );

-- ## Palette User Favorite
-- ========================================================
INSERT INTO Palette_User_Favorite (palette_id, user_id)
  VALUES (
    'c00000000000000000000001', 'u00000000000000000000002'
  ), (
    'c00000000000000000000002', 'u00000000000000000000002'
  ), (
    'c00000000000000000000003', 'u00000000000000000000002'
  ), (
    'c00000000000000000000004', 'u00000000000000000000002'
  ), (
    'c00000000000000000000005', 'u00000000000000000000002'
  ), (
    'c00000000000000000000006', 'u00000000000000000000002'
  ), (
    'c00000000000000000000007', 'u00000000000000000000001'
  );
