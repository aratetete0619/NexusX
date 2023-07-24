import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faDiagramProject, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src="/images/sidebar_logo.png" alt="App Logo" className={styles.logo} />
      </div>
      <nav>
        <ul className={styles.sidebarList}>
          <li className={styles.linkItem}>
            <FontAwesomeIcon icon={faGlobe} className={styles.icon} />
            <a href="/explore"><span className={styles.linkText}>Explore</span></a> {/* Link を a タグに変更 */}
          </li>
          <li className={styles.linkItem}>
            <FontAwesomeIcon icon={faDiagramProject} className={styles.icon} />
            <a href="/about"><span className={styles.linkText}>Optimization</span></a> {/* Link を a タグに変更 */}
          </li>
          <li className={styles.linkItem}>
            <FontAwesomeIcon icon={faUserCheck} className={styles.icon} />
            <a href="/registration"><span className={styles.linkText}>Registration</span></a> {/* Link を a タグに変更 */}
            <span className={styles.premiumIcon}>🌟</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
