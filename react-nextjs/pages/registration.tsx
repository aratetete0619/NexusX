import React, { useState, useEffect, useMemo } from 'react';
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
import { SAVE_USER_PAGE, SAVE_PAGE_DATA } from '../src/graphql/mutations';
import { DELETE_USER_PAGE } from '../src/graphql/mutations';
import Fuse from 'fuse.js';
import ReactPaginate from 'react-paginate';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { ADD_NODE, DELETE_ALL_NODES } from '../src/redux/actions';


type Props = {
  authenticated: boolean;
  username: string | null;
  email: string;
};

const RegistrationPage: React.FC<Props> = ({ authenticated, email, username }) => {
  const dispatch = useDispatch();
  const userIdOrUsername = username || email;
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();
  const [pageUUIDs, setPageUUIDs] = useState<string[]>([]);
  const [filteredUUIDs, setFilteredUUIDs] = useState<string[]>([]);
  const [selectedUUIDs, setSelectedUUIDs] = useState<string[]>([]);
  const [saveUserPage, { error }] = useMutation(SAVE_USER_PAGE);
  const [savePageData, { error: saveError }] = useMutation(SAVE_PAGE_DATA);
  const [deleteUserPage, { error: deleteError }] = useMutation(DELETE_USER_PAGE);
  const ITEMS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { t } = useTranslation('Registration');


  const initialNodesState = [{
    id: uuidv4(),
    name: 'Initial Node',
    x: 800,
    y: 300,
    isNew: false,
  }];

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const paginatedUUIDs = useMemo(() => {
    return filteredUUIDs.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);
  }, [filteredUUIDs, currentPage]);


  // 新しいページを追加
  const handleAddClick = async () => {
    if (authenticated) {
      dispatch({ type: DELETE_ALL_NODES });
      const uuidForPage = uuidv4();
      dispatch({ type: ADD_NODE, payload: initialNodesState[0] });

      try {
        // saveUserPage の非同期処理が完了するまで待つ
        await saveUserPage({
          variables: {
            email: email,
            pageId: uuidForPage,
          },
        });

        // savePageData の非同期処理が完了するまで待つ
        await savePageData({
          variables: {
            email: email,
            pageId: uuidForPage,
            data: { nodes: [initialNodesState[0]] },
          },
        });

        const newPageUUIDs = [...pageUUIDs, uuidForPage];
        setPageUUIDs(newPageUUIDs);
        localStorage.setItem('pageUUIDs', JSON.stringify(newPageUUIDs));

        // 上記の処理がすべて完了した後で、新しいページに移行する
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


  // チェックボックスの処理
  const handleCheckboxChange = (uuid: string, checked: boolean) => {
    if (checked) {
      setSelectedUUIDs([...selectedUUIDs, uuid]);
    } else {
      setSelectedUUIDs(selectedUUIDs.filter((id) => id !== uuid));
    }
  };

  // 選択したページを削除
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

  // 検索入力の変更を処理
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    dispatch({ type: DELETE_ALL_NODES });
    router.push(link);
  };


  // ローカルストレージからページUUIDsを取得
  useEffect(() => {
    const storedPageUUIDs = localStorage.getItem('pageUUIDs');
    if (storedPageUUIDs) {
      setPageUUIDs(JSON.parse(storedPageUUIDs));
    }
  }, []);

  // Fuse.jsを使用して検索
  useEffect(() => {
    if (searchTerm) {
      const fuse = new Fuse(pageUUIDs.map((uuid) => ({ id: uuid })), { keys: ['id'], includeScore: true });
      const results = fuse.search(searchTerm);
      setFilteredUUIDs(results.map((result) => result.item.id));
    } else {
      setFilteredUUIDs(pageUUIDs);
    }
  }, [searchTerm, pageUUIDs]);

  if (error) {
    console.error("An error occurred:", error.message);
    return <p>An error occurred while loading the page. Please try again later.</p>;
  }


  return (
    <ThemeProvider theme={createTheme()}>
      <MainLayout>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('Registration')}</h1>
          <div className={styles.searchContainer}>
            <FontAwesomeIcon icon={faSearch} className={styles.icon} />
            <input
              className={styles.searchBar}
              type="text"
              placeholder={t('Search')}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className={styles.toolbar}>
            <h2 className={styles.subTitle}>{t('YourRelationship')}</h2>
            <div className={styles.buttons}>
              <button className={styles.addButton} onClick={handleAddClick}>{t('Add')}</button>
              <button className={styles.deleteButton} onClick={handleDeleteClick}>{t('Delete')}</button>
            </div>
          </div>
          <ul className={styles.diagramList}>
            {paginatedUUIDs.length === 0 ? (
              <p className={styles.noDiagrams}>{t('noDiagrams')}</p>
            ) : (
              paginatedUUIDs.map((uuid) => (
                <li className={styles.diagramItem} key={uuid}>
                  <input
                    type="checkbox"
                    checked={selectedUUIDs.includes(uuid)}
                    onChange={(e) => handleCheckboxChange(uuid, e.target.checked)}
                  />
                  <a
                    href={`/registration/${userIdOrUsername}/${uuid}`}
                    onClick={(e) => handleLinkClick(e, `/registration/${userIdOrUsername}/${uuid}`)}
                  >
                    Page ID: {uuid}
                  </a>
                </li>
              ))
            )}
          </ul>
          <ReactPaginate
            previousLabel={t('Previous')}
            nextLabel={t('Next')}
            breakLabel={'...'}
            pageCount={Math.ceil(filteredUUIDs.length / ITEMS_PER_PAGE)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={styles.pagination}
            activeClassName={styles.activePage}
          />
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

  const translations = await serverSideTranslations(context.locale!, ['Sidebar', 'Registration']);

  return { props: { ...translations, authenticated: authResult.authenticated, username, email } };
};

export default RegistrationPage;
