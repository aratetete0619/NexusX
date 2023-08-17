import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MainLayout from '../src/components/layouts/MainLayout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styles from '../src/styles/Registration.module.css';
import { authenticateUser } from '../src/utils/auth';
import { GetServerSideProps } from 'next';

type RelationshipDiagram = {
  id: string;
  name: string;
};

type Props = {
  authenticated: boolean;
};

const RegistrationPage: React.FC<Props> = ({ authenticated }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [diagrams, setDiagrams] = useState<RelationshipDiagram[]>([
    // ダミーデータまたはAPIからのデータ
  ]);
  const router = useRouter();


  const handleAddClick = () => {
    if (authenticated) {
      router.push('/registration/user_id/new');
    } else {
      if (window.confirm('This feature is for registered users only. Would you like to register?')) {
        router.push('/signup');
      }
    }
  };

  const handleDeleteClick = (id: string) => {
    setDiagrams(diagrams.filter((diagram) => diagram.id !== id));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <MainLayout>
        <div className={styles.container}>
          <h1 className={styles.title}>Registration</h1>
          <div className={styles.searchContainer}>
            <FontAwesomeIcon icon={faSearch} className={styles.icon} />
            <input
              className={styles.searchBar}
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className={styles.toolbar}>
            <h2 className={styles.subTitle}>Your Relationship</h2>
            <div className={styles.buttons}>
              <button className={styles.addButton} onClick={handleAddClick}>Add</button>
              <button className={styles.deleteButton} onClick={() => handleDeleteClick('id')}>Delete</button>
            </div>
          </div>
          <ul className={styles.diagramList}>
            {diagrams.length === 0 ? (
              <p className={styles.noDiagrams}>No registrations have been made yet.</p>
            ) : (
              diagrams.map((diagram) => (
                <li className={styles.diagramItem} key={diagram.id}>
                  {diagram.name}
                </li>
              ))
            )}
          </ul>
        </div>
      </MainLayout>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authResult = await authenticateUser(context);
  return { props: { authenticated: authResult.authenticated } };
};


export default RegistrationPage;
