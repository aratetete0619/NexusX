import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '../src/styles/App.css';
import Map from '../src/components/Map';
import Toolbutton from '../src/components/Toolbutton';
import Sidebar from '../src/components/Sidebar'; // 追加
import MainLayout from '../src/components/layouts/MainLayout'; // 追加
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { store, persistor } from '../src/redux/store';
import 'typeface-roboto';

const AppWrapper: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const App: React.FC = () => {

  return (
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={createTheme()}>
        <DndProvider backend={HTML5Backend}>
          <MainLayout>
            <div className="app">
              <Toolbutton />
              <Map />
            </div>
          </MainLayout>
        </DndProvider>
      </ThemeProvider>
    </PersistGate>
  );
};

export default AppWrapper;
