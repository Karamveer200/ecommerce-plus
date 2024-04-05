import { useEffect, useState, useCallback } from 'react';
import hero from '../../../assets/hero.jpg';
import whiteHoodie from '../../../assets/Products/clothing/whiteHoodie.png';
import blueShirt from '../../../assets/Products/clothing/blueShirt.png';
import mobile from '../../../assets/Products/electronics/mobile.png';
import hardDrive from '../../../assets/Products/electronics/harddrive.png';
import speakers from '../../../assets/Products/electronics/speakers.png';
import yellowShoe from '../../../assets/Products/shoes/yellowShoe.png';
import redShoe from '../../../assets/Products/shoes/redShoe.png';
import whiteSlipper from '../../../assets/Products/shoes/whiteSlipper.png';

const Banner = () => {
  const images = [
    whiteHoodie,
    redShoe,
    hardDrive,
    speakers,
    blueShirt,
    yellowShoe,
    mobile,
    whiteSlipper
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === images?.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(intervalId);
  }, []);

  const RenderHeroImage = useCallback(
    () => (
      <div className="absolute top-[10%] right-10 md:right-20 mt-20 w-[37%] fadeIn">
        <img src={images[currentImageIndex]} className="" />
      </div>
    ),
    [currentImageIndex]
  );

  return (
    <div
      className={`relative h-[300px] sm:h-[400px] lg:h-[550px] xl:h-[750px] font-inter -mt-20 fadeInOneSecond`}>
      <img src={hero} alt="Logo" />

      <RenderHeroImage />

      <div className="absolute top-1/4 text-left left-10 md:left-20 mt-20 ">
        <p className="text-base md:text-xl lg:text-4xl xl:text-6xl font-bold text-white max-w-[150px] md:max-w-lg">
          Not sure what to buy? Perfect.
        </p>
        <p className="text-sm md:text-xl lg:text-3xl xl:text-5xl mt-2 md:mt-10 font-bold text-white">
          We have got you covered
        </p>
        <button
          className="text-white font-bold bg-blue-500 md:px-10 md:py-4 px-4 py-2 shadow-lg rounded-full my-10 hover:shadow-xl
        hover:scale-110 transition duration-300 hover:text-gray-900 hover:bg-blue-400">
          Explore Below
        </button>
      </div>
    </div>
  );
};

export default Banner;
