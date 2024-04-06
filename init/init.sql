 CREATE SCHEMA IF NOT EXISTS shop_zone;

 CREATE TABLE IF NOT EXISTS shop_zone.CATEGORY (
   category_id   SERIAL PRIMARY KEY,
   title         TEXT NOT NULL,
   type          TEXT NOT NULL,
   created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   updated_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
 );

 CREATE TABLE IF NOT EXISTS shop_zone.PRODUCTS (
   product_id         SERIAL PRIMARY KEY,
   category_id        INTEGER NOT NULL,
   name               TEXT NOT NULL,
   quantity           INTEGER NOT NULL,
   price              INTEGER NOT NULL,
   image_identifier   TEXT,
   stars              INTEGER NOT NULL,
   FOREIGN KEY (category_id) REFERENCES shop_zone.CATEGORY(category_id)
 );
 
INSERT INTO shop_zone.CATEGORY (TITLE, TYPE)                                                      
VALUES
    ('Foot wear', 'FOOT_WEAR'),
    ('Clothing', 'CLOTHING'),
    ('Electronics', 'ELECTRONICS');

INSERT INTO shop_zone.PRODUCTS (category_id, name, image_identifier, price, quantity, stars)                                                      
VALUES
    (1, 'Nike Air Black', 'BLACK_SHOES', 120, 7, 5),
    (1, 'Red Rose Preium', 'RED_SHOE', 220, 2, 4),
    (1, 'Winner Comfy', 'WHITE_SLIPPER', 50, 1, 3),
    (1, 'Jordan Royal Yellow', 'YELLOW_SHOW', 150, 9, 4),
    (1, 'Make Pro', '', 20, 3, 3),
    (1, 'Reilod Rose', '', 22, 1, 3),
    (1, 'Arus Comfy', '', 50, 2, 3),
    (1, 'Boys Pret', '', 50, 9, 3),
    (2, 'Mark Teen Blue', 'BLUE_SHIRT', 100, 8, 4),
    (2, 'Armaani Deluxe Yellow', 'YELLOW_SHIRT_2', 90, 9, 4),
    (2, 'Gucci Classic Hoodie', 'WHITE_HOODIE', 60, 3, 5),
    (2, 'K-POP Luxury', 'YELLOW_SHIRT', 500, 3, 5),
    (2, 'Mark Teen Blue', '', 10, 8, 3),
    (2, 'Arpis Way', '', 30, 9, 3),
    (2, 'Arlon Classic Hoodie', '', 5, 3, 3),
    (2, 'IMax Xl', '', 50, 2, 3),
    (3, 'IPhone 20 Pro Max', 'MOBILE', 3000, 12, 5),
    (3, 'BOSS Premium', 'SPEAKERS', 500, 6, 4),
    (3, 'Apple Charger', 'ADAPTER', 60, 8, 5),
    (3, 'Passport SSD 1TB', 'HARD_DRIVE', 120, 6, 3);
    

