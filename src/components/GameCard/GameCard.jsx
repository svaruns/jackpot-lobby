import React from 'react';
import PropTypes from 'prop-types';
import styles from './GameCard.module.scss';

/**
 * GameCard component displays a single game's info.
 * @param {Object} props
 * @param {Object} props.game - The game object to display
 */
const GameCard = ({ game }) => {
  if (!game) return null;
  return (
    <div className={styles.card} style={{ borderColor: game.borderColor }}>
      <div className={styles.thumbnailWrapper}>
        <img
          src={game.thumbnail}
          alt={game.name}
          className={styles.thumbnail}
          loading="lazy"
        />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{game.name}</div>
        <div className={styles.meta}>
          <span className={styles.vendor}>{game.vendor}</span>
          {game.categories && game.categories.length > 0 && (
            <span className={styles.category}>{game.categories[0]}</span>
          )}
        </div>
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
