// _app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useApollo } from '../lib/apolloClient';
import { store, persistor } from '../src/redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'typeface-roboto';
import '../src/styles/App.css';


const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <DndProvider backend={HTML5Backend}>
            <PersistGate loading={null} persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </DndProvider>
        </Provider>
      </ApolloProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
