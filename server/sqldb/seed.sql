\c colorhappy;

-- ##############################################################
-- # Seed Data
-- ##############################################################

-- ## Drop all tables.
-- ==========================
TRUNCATE TABLE Users, Palettes, Palette_User_Favorite CASCADE;

-- ## Users
-- ### Password = '123'
-- ===============================================================
INSERT INTO Users (id, full_name, username, email, loc, website, bio, password_hash)
  VALUES (
    'u00000000000000000000000',
    'Color Happy',
    'ColorHappy',
    'ch@this.com',
    'ColorsVille',
    'https://colorhappy12353223.com',
    'More information coming soon...',
    gen_hash('123')
  ), (
    'u00000000000000000000001',
    'Restless Moon',
    'restless-moon48',
    'chf@site.com',
    'Happy Town',
    'https://chfansite.com',
    'Hi.',
    gen_hash('123')
  );

INSERT INTO Users (full_name, username, email, loc, website, bio, password_hash)
  VALUES (
    'Palette Seed',
    'seed',
    'sd@sd.com',
    'Earth',
    'google.com',
    'I am a sample user',
    gen_hash('123')
  );

-- ## Palettes
-- =============================================================
INSERT INTO Palettes (id, user_id, title, description, colors)
  VALUES (
    'c00000000000000000000001',
    'u00000000000000000000000',
    'Lambs on Doors',
    'From COLOURlovers',
    ARRAY['DD002C', 'DD8395', 'DDC9A7', '958871', '533817']
  ), (
    'c00000000000000000000002',
    'u00000000000000000000000',
    'My New Palette',
    'From COLOURlovers',
    ARRAY['121013', '5cb6f2', '68d675', 'faf8fb', 'ee6926']
  ), (
    'c00000000000000000000003',
    'u00000000000000000000000',
    'i demand a pancake',
    'From COLOURlovers',
    ARRAY['594F4F', '547980', '45ADA8', '9DE0AD', 'E5FCC2']
  ), (
    'c00000000000000000000004',
    'u00000000000000000000000',
    'Giant Goldfish',
    'From COLOURlovers',
    ARRAY['69D2E7', 'A7DBD8', 'E0E4CC', 'F38630', 'FA6900']
  ), (
    'c00000000000000000000005',
    'u00000000000000000000000',
    'let them eat cake',
    'From COLOURlovers',
    ARRAY['774F38', 'E08E79', 'F1D4AF', 'ECE5CE', 'C5E0DC']
  ), (
    'c00000000000000000000006',
    'u00000000000000000000000',
    'vintage card',
    'From Adobe Kuler',
    ARRAY['5C4B51', '8CBEB2', 'F2EBBF', 'F3B562', 'F06060']
  ), (
    'c00000000000000000000007',
    'u00000000000000000000001',
    'Happy Mom',
    'From Adobe Kuler',
    ARRAY['3FB8AF', '79BAAF', 'DAFFA7', 'FFA09D', 'FF5F60']
  ), (
    'c00000000000000000000008',
    'u00000000000000000000001',
    'The Day',
    'From The Day''s Color',
    ARRAY['dd423e', 'df455f', '01afc3', '4e8b20', 'f5e27a']
  );

-- ## Palette User Favorite
-- ========================================================
INSERT INTO Palette_User_Favorite (palette_id, user_id)
  VALUES (
    'c00000000000000000000001', 'u00000000000000000000001'
  ), (
    'c00000000000000000000002', 'u00000000000000000000001'
  ), (
    'c00000000000000000000003', 'u00000000000000000000001'
  ), (
    'c00000000000000000000004', 'u00000000000000000000001'
  ), (
    'c00000000000000000000005', 'u00000000000000000000001'
  ), (
    'c00000000000000000000006', 'u00000000000000000000001'
  ), (
    'c00000000000000000000007', 'u00000000000000000000000'
  );
