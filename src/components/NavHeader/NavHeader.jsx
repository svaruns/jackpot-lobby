import React from 'react';
import Image from 'next/image';
import s from './NavHeader.module.scss';
import JackpotLogo from '@/assets/images/jackpotLogo.png';
import Button from '@/components/Button/Button';
import SearchIcon from '@/assets/images/searchIcon.png';
import NotificationIcon from '@/assets/images/notificationIcon.png';

const NavHeader = () => {
  return (
    <header className={s.header}>
      <div className={s.left}>
        <Image src={JackpotLogo} alt="Jackpot" className={s.logo} />
      </div>
      <div className={s.center}></div>
      <div className={s.right}>
        <Image src={SearchIcon} alt="Search" className={s.searchIcon} />
        <Image src={NotificationIcon} alt="Notification" className={s.notificationIcon} />
          <Button type="secondary" text="Login" />
          <Button type="primary" text="Register" />
      </div>
    </header>
  );
};

export default NavHeader; 