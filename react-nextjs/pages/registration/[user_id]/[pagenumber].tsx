import React from 'react';
import { useRouter } from 'next/router';
import Map from '../../../src/components/Map';
import MainLayout from '../../../src/components/layouts/MainLayout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { parseCookies } from 'nookies';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

const RegistrationPage: React.FC = () => {
  const router = useRouter();
  const { pagenumber } = router.query;

  const cookies = parseCookies();
  const email = cookies.email;


  return (
    <ThemeProvider theme={createTheme()}>
      <MainLayout>
        <Map email={email} pageId={pagenumber as string} />
      </MainLayout>
    </ThemeProvider>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale!, ['Sidebar']),
  },
});

export default RegistrationPage;
