import React from 'react';
import Image from 'next/image';

import Button from '@/components/Button/Button';
import JackpotLogo from '@/assets/images/jackpotLogo.png';
import JackpotIcon from '@/assets/images/jackpotIcon.png';
import SearchIcon from '@/assets/images/searchIcon.png';
import NotificationIcon from '@/assets/images/notificationIcon.png';

import s from './NavHeader.module.scss';

const NavHeader = () => {
  return (
    <header className={s.header}>
      <div className={s.left}>
        <span className={s.logoDesktop}>
          <Image src={JackpotLogo} alt="Jackpot" className={s.logo} />
        </span>
        <span className={s.logoMobile}>
          <Image src={JackpotIcon} alt="Jackpot" className={s.logo} />
        </span>
      </div>
      <div className={s.center}></div>
      <div className={s.right}>
        <span className={s.hideOnMobile}>
          <Image src={SearchIcon} alt="Search" className={s.searchIcon} />
        </span>
        <span className={s.hideOnMobile}>
          <Image src={NotificationIcon} alt="Notification" className={s.notificationIcon} />
        </span>
        <Button type="secondary" text="Login" />
        <Button type="primary" text="Register" />
      </div>
    </header>
  );
};

export default NavHeader; 