// pages/index.tsx
import React from 'react';
import Header from '../src/components/Header'
import Background from '../src/components/Background';
// import Youtube from '../src/components/Youtube';
import Summary1 from '../src/components/Summary1';
import Summary2 from '../src/components/Summary2';
import Summary3 from '../src/components/Summary3';
import Features from '../src/components/Features';
import Recruitment from '../src/components/Recruitment';
import Participation from '../src/components/Participation';
import Footer from '../src/components/Footer'
import styles from '../src/styles/index.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

const Home = () => (
  <div className={styles.container}>
    <Header />
    <div className={styles.content}>
      <Background />
      {/* <Youtube /> */}
      <Summary1 />
      <Summary2 />
      <Summary3 />
      <Features />
      <Recruitment />
      <Participation />
    </div>
    <Footer />
  </div>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale!, ['common', 'Summary1', 'Summary2', 'Summary3', 'Background', 'Features', 'Recruitment', 'Participation', 'Footer']),
  },
});

export default Home;
