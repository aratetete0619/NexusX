// src/components/layouts/MainLayout.tsx
import Sidebar from '../Sidebar';
import styles from '../../styles/MainLayout.module.css';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
