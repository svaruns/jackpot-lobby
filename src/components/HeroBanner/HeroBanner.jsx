import React from "react";
import Image from "next/image";
import banner from "@/assets/images/banner.png";

import s from "./HeroBanner.module.scss";

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
          <div className={s.banner} key={`banner-${idx}`}>
            <Image src={banner.image} alt="banner" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
