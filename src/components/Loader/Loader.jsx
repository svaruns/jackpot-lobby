import React from 'react';

import s from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={s.loaderContainer}>
      <div className={s.spinner}></div>
      <p>Loading games...</p>
    </div>
  );
};

export default Loader;
