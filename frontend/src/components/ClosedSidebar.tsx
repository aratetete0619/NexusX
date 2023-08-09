import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/ClosedSidebar.module.css';

const ClosedSidebar = ({ toggleSidebar }) => {
  return (
    <div className={styles.closedSidebar}>
      <div className={styles.openButton} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faCaretRight} /> {/* 右向きの三角形のアイコン */}
      </div>
    </div>
  );
};

export default ClosedSidebar;
