import '../src/styles/App.css';
import Map from '../src/components/Map';
import Toolbutton from '../src/components/Toolbutton';
import MainLayout from '../src/components/layouts/MainLayout';
import { ThemeProvider, createTheme } from '@mui/material/styles';



const RegistrationPage: React.FC = () => {

  return (
    <ThemeProvider theme={createTheme()}>
      <MainLayout>
        <div className="app">
          <Toolbutton />
          <Map />
        </div>
      </MainLayout>
    </ThemeProvider>
  );
};

export default RegistrationPage;
