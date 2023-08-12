import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/ClosedSidebar.module.css';

interface ClosedSidebarProps {
  toggleSidebar: () => void;
}

const ClosedSidebar: React.FC<ClosedSidebarProps> = ({ toggleSidebar }) => {
  return (
    <div className={styles.closedSidebar}>
      <div className={styles.openButton} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faCaretRight} />
      </div>
    </div>
  );
};

export default ClosedSidebar;
