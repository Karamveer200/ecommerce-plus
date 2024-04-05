import hero from './hero.jpg';
import logo from './logo.webp';
import blueShirt from './Products/clothing/blueShirt.png';
import whiteHoodie from './Products/clothing/whiteHoodie.png';
import yellowShirt from './Products/clothing/yellowTshirt.png';

import adapter from './Products/electronics/adapter.png';
import hardDrive from './Products/electronics/harddrive.png';
import mobile from './Products/electronics/mobile.png';
import speakers from './Products/electronics/speakers.png';

import blackBoots from './Products/shoes/blackBoots.png';
import blackShoes from './Products/shoes/blackShoes.png';
import redShoe from './Products/shoes/redShoe.png';
import whiteSlipper from './Products/shoes/whiteSlipper.png';
import yellowShoe from './Products/shoes/yellowShoe.png';

export const productAssetManager = Object.freeze({
  CLOTHING: {
    BLUE_SHIRT: blueShirt,
    YELLOW_SHIRT_2: yellowShirt,
    WHITE_HOODIE: whiteHoodie,
    YELLOW_SHIRT: yellowShirt
  },
  ELECTRONICS: {
    MOBILE: mobile,
    SPEAKERS: speakers,
    ADAPTER: adapter,
    HARD_DRIVE: hardDrive
  },
  FOOT_WEAR: {
    BLACK_SHOES: blackShoes,
    RED_SHOE: redShoe,
    WHITE_SLIPPER: whiteSlipper,
    YELLOW_SHOW: yellowShoe
  }
});

export const assetManager = Object.freeze({
  hero: hero,
  logo: logo,
  ...productAssetManager
});
