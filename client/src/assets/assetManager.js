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
  clothing: {
    blueShirt,
    yellowShirt2: yellowShirt,
    whiteHoodie,
    yellowShirt
  },
  electronics: {
    mobile,
    speakers,
    adapter,
    hardDrive
  },
  footWear: {
    blackBoots,
    blackShoes,
    redShoe,
    whiteSlipper,
    yellowShoe
  }
});

export const assetManager = Object.freeze({
  hero: hero,
  logo: logo,
  ...productAssetManager
});
