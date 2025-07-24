import React, { useEffect, useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

import GameCard from "@/components/GameCard/GameCard";
import { useFilterStore } from "@/store/filters";
import arrowRight from "@/assets/images/arrowRight.png";
import useDragScroll from "./useDragScroll";
import classNames from "classnames";
import { ALT_ARROW_LEFT, ALT_ARROW_RIGHT } from "@/constants/strings";

import s from "./CategorySection.module.scss";

const CategorySection = ({ title, games, showViewAll = true, icon }) => {
  const scrollRef = useDragScroll();
  const { setSelectedCategory } = useFilterStore();

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateScroll = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    updateScroll();
    el.addEventListener("scroll", updateScroll);
    window.addEventListener("resize", updateScroll);
    return () => {
      el.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [scrollRef]);

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
        <div className={s.titleContainer}>
          <Image src={icon} alt={title} className={s.icon} />
          <h2 className={s.title}>{title}</h2>
        </div>

        {showViewAll && (
          <div className={s.controls}>
            <button className={s.viewAllBtn} onClick={handleViewAll}>
              View All
            </button>
            <div className={s.arrowGroup}>
              <Image
                src={arrowRight}
                width={16}
                height={16}
                className={classNames(s.leftArrowBtn, s.rotate180)}
                alt={ALT_ARROW_LEFT}
                style={{ opacity: canScrollLeft ? 1 : 0.5, cursor: canScrollLeft ? 'pointer' : 'default' }}
                onClick={() => canScrollLeft && scrollBy(-500)}
              />
              <Image
                src={arrowRight}
                width={16}
                height={16}
                className={s.rightArrowBtn}
                alt={ALT_ARROW_RIGHT}
                style={{ opacity: canScrollRight ? 1 : 0.5, cursor: canScrollRight ? 'pointer' : 'default' }}
                onClick={() => canScrollRight && scrollBy(500)}
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
