import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faDiagramProject, faUserCheck, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Sidebar.module.css';

type Props = {
  toggleSidebar: () => void;
};

const Sidebar: React.FC<Props> = ({ toggleSidebar }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.closeButton} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </div>
      <div className={styles.logoContainer}>
        <Image src="/images/sidebar_logo.png" alt="App Logo" className={styles.logo} width="300" height="150" />
      </div>
      <nav>
        <ul className={styles.sidebarList}>
          <li className={styles.linkItem}>
            <FontAwesomeIcon icon={faGlobe} className={styles.icon} />
            <Link href="/explore"><span className={styles.linkText}>Explore</span></Link>
          </li>
          <li className={styles.linkItem}>
            <FontAwesomeIcon icon={faDiagramProject} className={styles.icon} />
            <Link href="/about"><span className={styles.linkText}>Optimization</span></Link>
          </li>
          <li className={styles.linkItem}>
            <FontAwesomeIcon icon={faUserCheck} className={styles.icon} />
            <Link href="/registration"><span className={styles.linkText}>Registration</span></Link>
            <span className={styles.premiumIcon}>🌟</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
