import React from "react";
import Image from "next/image";
import PropTypes from 'prop-types'

import GameCard from "@/components/GameCard/GameCard";
import { useFilterStore } from "@/store/filters";
import arrowLeft from "@/assets/images/arrowLeft.png";
import arrowRight from "@/assets/images/arrowRight.png";
import useDragScroll from "./useDragScroll";

import s from "./CategorySection.module.scss";

const CategorySection = ({ title, games, showViewAll = true }) => {
  const scrollRef = useDragScroll();
  const { setSelectedCategory } = useFilterStore();

  if (!games || games.length === 0) return null;

  const handleViewAll = () => {
    setSelectedCategory(title);
  };

  const scrollBy = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section className={s.section}>
      <div className={s.header}>
        <h2 className={s.title}>{title}</h2>
        {showViewAll && (
          <div className={s.controls}>
            <button className={s.viewAllBtn} onClick={handleViewAll}>
              View All
            </button>
            <div className={s.arrowGroup}>
              <Image
                src={arrowLeft}
                width={16}
                height={16}
                className={s.leftArrowBtn}
                alt="arrowLeft"
                onClick={() => scrollBy(-300)}
              />
              <Image
                src={arrowRight}
                width={16}
                height={16}
                className={s.rightArrowBtn}
                alt="arrowRight"
                onClick={() => scrollBy(300)}
              />
            </div>
          </div>
        )}
      </div>
      <div className={s.scrollRow} ref={scrollRef}>
        {games.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
    </section>
  );
};

CategorySection.propTypes = {
  title: PropTypes.string.isRequired,
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  showViewAll: PropTypes.bool,
};

export default CategorySection;
