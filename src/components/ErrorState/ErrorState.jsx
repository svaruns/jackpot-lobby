import React from 'react';

import s from './ErrorState.module.scss';

const ErrorState = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className={s.errorContainer}>
      <div className={s.errorIcon}>⚠️</div>
      <h3>Error</h3>
      <p>{message}</p>
      {onRetry && (
        <button className={s.retryButton} onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;
