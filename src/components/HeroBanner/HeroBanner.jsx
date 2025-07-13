import React from "react";
import s from "./HeroBanner.module.scss";
import banner from "@/assets/images/banner.png";
import Image from "next/image";

const banners = [
  {
    image: banner,
    url: "",
  },
];

const HeroBanner = () => {
  return (
    <div className={s.heroBanner}>
      <div className={s.bannerRow}>
        {banners.map((banner, idx) => (
          <div className={s.banner} key={idx}>
            <Image src={banner.image} alt="banner" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
