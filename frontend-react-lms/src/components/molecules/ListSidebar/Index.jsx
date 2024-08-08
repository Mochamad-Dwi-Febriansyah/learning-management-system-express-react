import AdminListSidebar from "./Admin/Index.jsx";
import GuruListSidebar from "./Guru/Index.jsx";
import SiswaListSidebar from "./Siswa/Index.jsx";
import Cookies from 'js-cookie'; 

const ListSidebar = () => {
  const userRole = Cookies.get('user_type');  

  const renderContent = () => {
      switch (userRole) {
          case "ADMIN":
              return <AdminListSidebar/>
          case "GURU":
              return <GuruListSidebar/>
          case "SISWA":
              return <SiswaListSidebar/>
          default:
              return null
      }
  }
  return (
    <>
     {renderContent()}
    </>
  );
};

export default ListSidebar;
