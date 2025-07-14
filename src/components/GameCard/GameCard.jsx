import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

import styles from "./GameCard.module.scss";

/**
 * GameCard component displays a single game's info.
 * @param {Object} props
 * @param {Object} props.game
 */
const GameCard = ({ game }) => {
  if (!game) return null;
  return (
    <div className={styles.card} style={{ borderColor: game.borderColor }}>
      <div className={styles.thumbnailWrapper}>
        <Image
          src={game.thumbnail}
          width={171}
          height={227}
          alt={game.name}
          className={styles.thumbnail}
          loading="lazy"
        />
      </div>
    </div>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    vendor: PropTypes.string,
    thumbnail: PropTypes.string.isRequired,
    borderColor: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default GameCard;
