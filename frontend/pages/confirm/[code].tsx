import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import Loader from '../../src/components/Loader';
import { ErrorContext } from '../../src/contexts/ErrorContext';
import styles from '../../src/styles/ConfirmationPage.module.css';

const CONFIRM_USER = gql`
  mutation ConfirmUser($confirmationCode: String!) {
    confirmUser(confirmationCode: $confirmationCode) {
      success
      message
    }
  }
`;

const ConfirmationPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [confirmUser, { data, loading, error }] = useMutation(CONFIRM_USER);
  const [message, setMessage] = useState('');
  const { showError } = useContext(ErrorContext);

  useEffect(() => {
    const confirm = async () => {
      try {
        const response = await confirmUser({ variables: { confirmationCode: code } });
        if (response.data && response.data.confirmUser) {
          setMessage(response.data.confirmUser.message);
        }
        setTimeout(() => {
          router.push('/login');
        }, 5000); // 5 seconds delay
      } catch (err) {
        showError(`An error occurred: ${err.message}`);
      }
    };

    if (code) {
      confirm();
    }
  }, [code]);

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <h1>Email Confirmation</h1>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default ConfirmationPage;
