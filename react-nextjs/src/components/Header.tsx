import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Header.module.css';
import { useTranslation } from 'next-i18next';
import AuthenticatedLink from './AuthenticatedLink';

const Header = () => {
  const { t } = useTranslation('common');

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <Image src="/nexusxMainWithSloganLogo.png" alt="logo" className={styles.logo} width="100" height="60" />
        <nav className={styles.navLinks}>
          <a href="#about">{t('about')}</a>
          <a href="#contact">{t('contact')}</a>
          <a href="#feedback">{t('feedback')}</a>
        </nav>
      </div>
      <div className={styles.buttonGroup}>
        <Link href="/login">
          <button className={`${styles.customButton} ${styles.login}`}>{t('login')}</button>
        </Link>
        <AuthenticatedLink to="/explore">
          <button className={styles.customButton}>
            {t('tryNexusX')}
          </button>
        </AuthenticatedLink>
      </div>
    </header>
  );
};

export default Header;
