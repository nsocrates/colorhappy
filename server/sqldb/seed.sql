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
    'notareal@email.com',
    'ColorsVille',
    'https://colorhappy12353223.com',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero non quaerat delectus consectetur voluptatum, animi eos. Unde eveniet, alias veniam dicta asperiores ipsam esse exercitationem dolorem et sequi, optio reprehenderit?',
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
  ), (
    'u00000000000000000000002',
    'Joseph K',
    'test',
    'null@null.com',
    'The Bureaucracy',
    'null.com',
    'Studying Law.',
    gen_hash('123')
  );

-- ## Palettes
-- =============================================================
INSERT INTO Palettes (id, user_id, title, description, colors)
  VALUES (
    'c00000000000000000000001',
    'u00000000000000000000000',
    'Lambs on Doors',
    'From COLOURlovers by ?',
    ARRAY['DD002C', 'DD8395', 'DDC9A7', '958871', '533817']
  ), (
    'c00000000000000000000002',
    'u00000000000000000000000',
    'Dreamer',
    'From COLOURlovers by skimmersky',
    ARRAY['7282A4', 'A68EBF', 'A0B5D9', '8ADBD3', 'B0EBB3']
  ), (
    'c00000000000000000000003',
    'u00000000000000000000000',
    'i demand a pancake',
    'From COLOURlovers by alpen',
    ARRAY['594F4F', '547980', '45ADA8', '9DE0AD', 'E5FCC2']
  ), (
    'c00000000000000000000004',
    'u00000000000000000000000',
    'Giant Goldfish',
    'From COLOURlovers by manekineko',
    ARRAY['69D2E7', 'A7DBD8', 'E0E4CC', 'F38630', 'FA6900']
  ), (
    'c00000000000000000000005',
    'u00000000000000000000000',
    'let them eat cake',
    'From COLOURlovers by lunalein',
    ARRAY['774F38', 'E08E79', 'F1D4AF', 'ECE5CE', 'C5E0DC']
  ), (
    'c00000000000000000000006',
    'u00000000000000000000000',
    'vintage card',
    'From Adobe Kuler by noyumo',
    ARRAY['5C4B51', '8CBEB2', 'F2EBBF', 'F3B562', 'F06060']
  ), (
    'c00000000000000000000007',
    'u00000000000000000000000',
    'Happy Mom',
    'From Adobe Kuler by chicodm',
    ARRAY['3FB8AF', '79BAAF', 'DAFFA7', 'FFA09D', 'FF5F60']
  ), (
    'c00000000000000000000008',
    'u00000000000000000000000',
    '905 COLOURfriends',
    'From COLOURlovers by soniapbgomes',
    ARRAY['FF8076', 'FB2B79', 'C2798D', 'A2979B', '8BA9B1']
  ), (
    'c00000000000000000000009',
    'u00000000000000000000000',
    'Steven''s Palate',
    'From COLOURlovers by s_nguyen14',
    ARRAY['98DAE5', 'D3D2E8', 'D7E1F2', '9CA2AD', '666D78']
  ), (
    'c00000000000000000000010',
    'u00000000000000000000000',
    'coup de grâce',
    'From COLOURlovers by pseudonympho',
    ARRAY['99B898', 'FECEA8', 'FF847C', 'E84A5F', '2A363B']
  ), (
    'c00000000000000000000011',
    'u00000000000000000000000',
    'QB Studio',
    'From Adobe Kuler by reneg',
    ARRAY['FFBC67', 'DA727E', 'AC6C82', '685C79', '455C7B']
  ), (
    'c00000000000000000000012',
    'u00000000000000000000000',
    'Tenui',
    'From Adobe Kuler by matteo.seduta',
    ARRAY['DBB4D8', 'F4F1F3', 'CBCDF0', '7BB3C0', '177D90']
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
    'c00000000000000000000007', 'u00000000000000000000001'
  ), (
    'c00000000000000000000008', 'u00000000000000000000001'
  ), (
    'c00000000000000000000009', 'u00000000000000000000001'
  ), (
    'c00000000000000000000010', 'u00000000000000000000001'
  ), (
    'c00000000000000000000011', 'u00000000000000000000001'
  ), (
    'c00000000000000000000012', 'u00000000000000000000001'
  );
