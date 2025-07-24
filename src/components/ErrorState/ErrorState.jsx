import React from 'react';

import { ERROR_GENERIC } from "@/constants/strings";

import s from './ErrorState.module.scss';

const ErrorState = ({ message = ERROR_GENERIC, onRetry }) => {
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
