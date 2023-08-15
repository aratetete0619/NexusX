// _app.tsx
import React from 'react';
import Head from 'next/head';
import { ErrorProvider } from '../src/contexts/ErrorContext';
import { SuccessProvider } from "../src/contexts/SuccessContext";
import { NoResultProvider } from '../src/contexts/NoResultContext';
import SuccessPopup from '../src/components/SuccessPopup';
import ErrorPopup from '../src/components/ErrorPopup';
import NoResultPopup from '../src/components/NoResultPopup';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useApollo } from '../lib/apolloClient';
import { store, persistor } from '../src/redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '../src/contexts/AuthContext';
import 'typeface-roboto';
import '../src/styles/App.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <div className="app">
      <Head>
        <link rel="icon" href="/nexusxLogo.png" type="image/png" />
      </Head>
      <AuthProvider>
        <SuccessProvider>
          <ErrorProvider>
            <NoResultProvider>
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
                <ApolloProvider client={apolloClient}>
                  <Provider store={store}>
                    <DndProvider backend={HTML5Backend}>
                      <PersistGate loading={null} persistor={persistor}>
                        <Component {...pageProps} />
                        <SuccessPopup />
                        <ErrorPopup />
                        <NoResultPopup />
                      </PersistGate>
                    </DndProvider>
                  </Provider>
                </ApolloProvider>
              </GoogleOAuthProvider>
            </NoResultProvider>
          </ErrorProvider>
        </SuccessProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
