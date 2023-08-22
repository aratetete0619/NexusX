import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faDiagramProject, faUserCheck, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'next-i18next';

type Props = {
  toggleSidebar: () => void;
};

const Sidebar: React.FC<Props> = ({ toggleSidebar }) => {
  const { t } = useTranslation('Sidebar');

  return (
    <div className={styles.sidebar}>
      <div className={styles.closeButton} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faCaretLeft} className={styles.icon} />
      </div>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image src="/images/sidebar_logo.png" alt="App Logo" className={styles.logo} width="300" height="150" />
        </Link>
      </div>
      <nav>
        <ul className={styles.sidebarList}>
          <li className={styles.linkItem}>
            <FontAwesomeIcon icon={faGlobe} className={styles.icon} />
            <Link href="/explore"><span className={styles.linkText}>{t('explore')}</span></Link>
          </li>
          <li className={styles.linkItem}>
            <FontAwesomeIcon icon={faDiagramProject} className={styles.icon} />
            <Link href="/about"><span className={styles.linkText}>{t('optimization')}</span></Link>
          </li>
          <li className={styles.linkItem}>
            <FontAwesomeIcon icon={faUserCheck} className={styles.icon} />
            <Link href="/registration"><span className={styles.linkText}>{t('registration')}</span></Link>
            <span className={styles.premiumIcon}>🌟</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
