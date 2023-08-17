import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MainLayout from '../src/components/layouts/MainLayout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styles from '../src/styles/Registration.module.css';
import { authenticateUser } from '../src/utils/auth';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useMutation } from '@apollo/client';
import { SAVE_USER_PAGE } from '../src/graphql/mutations';
import { DELETE_USER_PAGE } from '../src/graphql/mutations';


type RelationshipDiagram = {
  id: string;
  name: string;
};

type Props = {
  authenticated: boolean;
  username: string | null;
  email: string;
};

const RegistrationPage: React.FC<Props> = ({ authenticated, email, username }) => {
  const userIdOrUsername = username || email;
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [diagrams, setDiagrams] = useState<RelationshipDiagram[]>([
    // ダミーデータまたはAPIからのデータ
  ]);
  const router = useRouter();
  const [pageUUIDs, setPageUUIDs] = useState<string[]>([]);
  const [selectedUUIDs, setSelectedUUIDs] = useState<string[]>([]);
  const [saveUserPage, { error }] = useMutation(SAVE_USER_PAGE);
  const [deleteUserPage, { error: deleteError }] = useMutation(DELETE_USER_PAGE);




  const handleAddClick = async () => {
    if (authenticated) {
      const uuidForPage = uuidv4();

      try {
        await saveUserPage({
          variables: {
            email: email,
            pageId: uuidForPage,
          },
        });

        const newPageUUIDs = [...pageUUIDs, uuidForPage];
        setPageUUIDs(newPageUUIDs);

        localStorage.setItem('pageUUIDs', JSON.stringify(newPageUUIDs));

        router.push(`/registration/${userIdOrUsername}/${uuidForPage}`);
      } catch (err) {
        console.error("Error saving page:", err);
        alert("An error occurred while saving the page. Please try again.");
      }
    } else {
      if (window.confirm('This feature is for registered users only. Would you like to register?')) {
        router.push('/signup');
      }
    }
  };


  const handleCheckboxChange = (uuid: string, checked: boolean) => {
    if (checked) {
      setSelectedUUIDs([...selectedUUIDs, uuid]);
    } else {
      setSelectedUUIDs(selectedUUIDs.filter((id) => id !== uuid));
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete the selected pages?')) {
      try {
        for (const uuid of selectedUUIDs) {
          await deleteUserPage({
            variables: {
              email: email,
              pageId: uuid,
            },
          });
        }

        const remainingUUIDs = pageUUIDs.filter((uuid) => !selectedUUIDs.includes(uuid));
        setPageUUIDs(remainingUUIDs);
        localStorage.setItem('pageUUIDs', JSON.stringify(remainingUUIDs));
        setSelectedUUIDs([]);
      } catch (err) {
        console.error("Error deleting page:", err);
        alert("An error occurred while deleting the page. Please try again.");
      }
    }
  };


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const storedPageUUIDs = localStorage.getItem('pageUUIDs');
    if (storedPageUUIDs) {
      setPageUUIDs(JSON.parse(storedPageUUIDs));
    }
  }, []);

  if (error) {
    console.error("An error occurred:", error.message);
    return <p>An error occurred while loading the page. Please try again later.</p>;
  }


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
              <button className={styles.deleteButton} onClick={handleDeleteClick}>Delete</button>
            </div>
          </div>
          <ul className={styles.diagramList}>
            {pageUUIDs.length === 0 ? (
              <p className={styles.noDiagrams}>No registrations have been made yet.</p>
            ) : (
              pageUUIDs.map((uuid) => (
                <li className={styles.diagramItem} key={uuid}>
                  <input
                    type="checkbox"
                    checked={selectedUUIDs.includes(uuid)}
                    onChange={(e) => handleCheckboxChange(uuid, e.target.checked)}
                  />
                  <Link href={`/registration/${userIdOrUsername}/${uuid}`}>
                    Page ID: {uuid}
                  </Link>
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
  const cookies = parseCookies(context);
  const email = cookies.email;
  const username = cookies.username || null;

  return { props: { authenticated: authResult.authenticated, username, email } };
};


export default RegistrationPage;
