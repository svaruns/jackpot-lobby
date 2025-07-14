import React from 'react';

import s from './EmptyState.module.scss';

const EmptyState = ({ message = "No results found" }) => {
  return (
    <div className={s.emptyContainer}>
      <div className={s.emptyIcon}>🔍</div>
      <h3>No Results</h3>
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
