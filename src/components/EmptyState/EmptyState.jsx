import React from 'react';

import { EMPTY_NO_RESULTS } from "@/constants/strings";

import s from './EmptyState.module.scss';

const EmptyState = ({ message = EMPTY_NO_RESULTS }) => {
  return (
    <div className={s.emptyContainer}>
      <div className={s.emptyIcon}>🔍</div>
      <h3>No Results</h3>
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
