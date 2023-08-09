import '../src/styles/App.css';
import Map from '../src/components/Map';
import Edge from '../src/components/Edge'
import MainLayout from '../src/components/layouts/MainLayout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Sidebar from '../src/components/Sidebar'


const RegistrationPage: React.FC = () => {

  return (
    <ThemeProvider theme={createTheme()}>
      <MainLayout />
      <Sidebar />
      <Map />
    </ThemeProvider>
  );
};

export default RegistrationPage;
