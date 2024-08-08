import { useState } from "react";
import Sidebar from "../organisms/Sidebar/Index";
import Navbar from "../organisms/Navbar/Index";
import PropTypes from "prop-types";

const ManageLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
 

  return (
    <>
      <div className="bg-nature min-height-230 bg-primary position-absolute w-100"></div>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="main-content position-relative border-radius-lg">
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="container-fluid py-4"> 
        <div className="row mb-4">
        <div className="col-12">
          {children}
        </div>
        </div>
        </div>
      </main>
    </>
  );
};

ManageLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default ManageLayout;
