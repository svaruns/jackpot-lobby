import React from 'react';
import Image from 'next/image';

import Button from '@/components/Button/Button';
import JackpotLogo from '@/assets/images/jackpotLogo.png';
import JackpotIcon from '@/assets/images/jackpotIcon.png';
import SearchIcon from '@/assets/images/searchIcon.png';
import NotificationIcon from '@/assets/images/notificationIcon.png';

import { LOGIN, REGISTER, ALT_JACKPOT, ALT_SEARCH, ALT_NOTIFICATION } from "@/constants/strings";

import s from './NavHeader.module.scss';

const NavHeader = () => {
  return (
    <header className={s.header}>
      <div className={s.left}>
        <span className={s.logoDesktop}>
          <Image src={JackpotLogo} alt={ALT_JACKPOT} className={s.logo} />
        </span>
        <span className={s.logoMobile}>
          <Image src={JackpotIcon} alt={ALT_JACKPOT} className={s.logo} />
        </span>
      </div>
      <div className={s.center}></div>
      <div className={s.right}>
        <span className={s.hideOnMobile}>
          <Image src={SearchIcon} alt={ALT_SEARCH} className={s.searchIcon} />
        </span>
        <span className={s.hideOnMobile}>
          <Image src={NotificationIcon} alt={ALT_NOTIFICATION} className={s.notificationIcon} />
        </span>
        <Button type="secondary" text={LOGIN} />
        <Button type="primary" text={REGISTER} />
      </div>
    </header>
  );
};

export default NavHeader; 