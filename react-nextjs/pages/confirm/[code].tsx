import { useEffect, useState, useContext, FC } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import Loader from '../../src/components/Loader';
import { ErrorContext } from '../../src/contexts/ErrorContext';
import { CONFIRM_USER } from '../../src/graphql/mutations'
import styles from '../../src/styles/ConfirmationPage.module.css';

interface ConfirmUserResponse {
  confirmUser: {
    success: boolean;
    message: string;
  };
}

const ConfirmationPage: FC = () => {
  const router = useRouter();
  const { code } = router.query;
  const [confirmUser, { data, loading, error }] = useMutation<ConfirmUserResponse>(CONFIRM_USER);
  const [message, setMessage] = useState('');
  const errorContext = useContext(ErrorContext);
  if (!errorContext) {
    throw new Error('ErrorContext not provided');
  }
  const { showError } = errorContext;

  useEffect(() => {
    const confirm = async () => {
      try {
        const response = await confirmUser({ variables: { confirmationCode: code } });
        if (response.data && response.data.confirmUser) {
          setMessage(response.data.confirmUser.message);
        }
        setTimeout(() => {
          router.push('/login');
        }, 5000);
      } catch (err) {
        if (err instanceof Error) {
          showError(`An error occurred: ${err.message}`);
        } else {
          showError(`An unknown error occurred: ${err}`);
        }
      }
    };

    if (code) {
      confirm();
    }
  }, [code, confirmUser, router, showError]);

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <h1>Email Confirmation</h1>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default ConfirmationPage;
