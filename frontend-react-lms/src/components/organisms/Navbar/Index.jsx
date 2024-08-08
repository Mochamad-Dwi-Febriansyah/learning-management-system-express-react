import PropTypes from "prop-types"
// import { useState } from "react";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import { useState } from "react";
 

const Navbar = ({isSidebarOpen, toggleSidebar}) => {
  // const [name, setName] = useState()
    // const [dropdownOpen, setDropdownOpen] = useState(false);

    // const toggleDropdown = () => {
    //     setDropdownOpen(!dropdownOpen)
    // }

    // const token = Cookies.get("token")
    // const name_user = jwtDecode(token)
    // console.log(name_user.nama)
    // setName(name_user.nama)

    return (
        <>
          <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl "
          id="navbarBlur"
          data-scroll="false"
        >
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <a className="opacity-5 text-white" href="#">
                    Pages
                  </a>
                </li>
                <li
                  className="breadcrumb-item text-sm text-white active"
                  aria-current="page"
                >
                  Dashboard
                </li>
              </ol>
              <h6 className="font-weight-bolder text-white mb-0">Dashboard</h6>
            </nav>
            <div
              className="collapse navbar-collapsee mt-sm-0 mt-2 me-md-0 me-sm-4 gap-2"
              id="navbar"
            >
              <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                <div className="input-group">
                  <span className="input-group-text text-body">
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type here..."
                  />
                </div>
              </div>
              <ul className="navbar-nav justify-content-end flex-nowrap flex-row">
                <li className="nav-item d-flex align-items-center">
                  <a
                    href="#"
                    className="nav-link text-white font-weight-bold px-0"
                  >
                    <i className="fa fa-user me-sm-1"></i>
                    <span className="d-sm-inline d-none"></span>
                  </a>
                </li>
                <li className="nav-item d-xl-none ps-3 d-flex align-items-center" onClick={toggleSidebar}>
                  <a
                    href="#"
                    className="nav-link text-white p-0"
                    id="iconNavbarSidenav"
                  >
                    <div className="sidenav-toggler-inner">
                      <i className={`sidenav-toggler-line ${isSidebarOpen ? 'line-active' : ''} bg-white`}></i>
                      <i className={`sidenav-toggler-line ${isSidebarOpen ? 'line-active' : ''} bg-white`}></i>
                      <i className={`sidenav-toggler-line ${isSidebarOpen ? 'line-active' : ''} bg-white`}></i>
                    </div>
                  </a>
                </li> 
              
              </ul>
            </div>
          </div>
        </nav>
        </>
    )
}

Navbar.propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired
}

export default Navbar