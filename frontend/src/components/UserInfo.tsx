import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/UserInfo.module.css';
import { parseCookies, destroyCookie } from 'nookies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';


const UserInfo = () => {
  const { logout } = useContext(AuthContext);
  const cookies = parseCookies();
  const username = cookies.email;
  const userIcon = "/gorilla.png";

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  const handleLogout = () => {
    logout();
    ['token', 'email'].forEach(cookieKey => {
      destroyCookie(null, cookieKey, { path: '/' });
    });
  };

  return (
    <div className={styles.userInfo}>
      <Image src={userIcon} alt="User Icon" className={styles.userIcon} width="50" height="50" />
      <span className={styles.username}>
        {username}
        <FontAwesomeIcon icon={faChevronDown} className={styles.toggle} onClick={() => setShowMenu(!showMenu)} />
      </span>
      {showMenu && (
        <div className={styles.dropdownMenu} ref={menuRef}>
          <div onClick={() => console.log('Go to Settings')}>
            <FontAwesomeIcon icon={faCog} className={styles.icon} />
            Settings
          </div>
          <div onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className={styles.icon} />
            Logout
          </div>
        </div>

      )}
    </div>
  );
};

export default UserInfo;
