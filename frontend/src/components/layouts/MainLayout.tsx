import Sidebar from '../Sidebar';


const MainLayout: React.FC = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      {children}
    </div>
  );
};


export default MainLayout;
