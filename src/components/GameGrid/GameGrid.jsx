import React from 'react';
import PropTypes from 'prop-types';
import GameCard from '../GameCard/GameCard';
import styles from './GameGrid.module.scss';

/**
 * GameGrid component displays a grid of GameCards.
 * @param {Object} props
 * @param {Array} props.games - Array of game objects to display
 */
const GameGrid = ({ games }) => {
  if (!games || games.length === 0) {
    return <div className={styles.empty}>No games found.</div>;
  }
  return (
    <div className={styles.grid}>
      {games.map((game) => (
        <GameCard key={game.slug} game={game} />
      ))}
    </div>
  );
};

GameGrid.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GameGrid;
