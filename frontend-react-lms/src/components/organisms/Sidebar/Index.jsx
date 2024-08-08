import Icon from "../../../assets/img/logo-smk.png";
import PropTypes from "prop-types"
import ListSidebar from "../../molecules/ListSidebar/Index";
import { NavLink } from "react-router-dom";

const Sidebar = ({isSidebarOpen, toggleSidebar}) => {
    return (
        <>
        <aside
         className={`sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-top-start-1xl my-3 fixed-start ms-4 ${isSidebarOpen ? 'active' : ''}`}
         id="sidenav-main"
       >
         <div className="sidenav-header">
           <i
             className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-xl-none" onClick={toggleSidebar}
             aria-hidden="true"
             id="iconSidenav"
           ></i>
           <NavLink to="/dashboard" className="navbar-brand m-0 d-flex align-items-center">
             <img
               src={Icon}
               className="navbar-brand-img h-100"
               alt="main_logo"
             />
             <span className="ms-2 font-weight-bold">Belajar Bersama</span>
           </NavLink> 
         </div>
         <hr className="horizontal dark mt-0" />
         <div
           className="collapse navbar-collapse  w-auto h-100"
           id="sidenav-collapse-main"
         >
         <ListSidebar />
         </div>
       </aside>
    </>
    )
}

Sidebar.propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired
}


export default Sidebar