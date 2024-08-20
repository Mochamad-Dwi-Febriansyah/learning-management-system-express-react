import PropTypes from "prop-types"
import { useFetchMe } from "../../../features/Auth/Setting/useFetchMe"
import { useState, useEffect } from 'react';
 

const Navbar = ({isSidebarOpen, toggleSidebar, breadcrumb = [] }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  // console.log(breadcrumb)
  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the timer when component unmounts
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    // Format hari, tanggal, bulan, tahun, dan waktu dengan zona waktu Jakarta
    const formattedDate = time.toLocaleDateString('id-ID', {
      weekday: 'long',   // Hari dalam format penuh (misalnya "Senin")
      day: 'numeric',    // Tanggal
      month: 'long',     // Bulan dalam format penuh (misalnya "Januari")
      year: 'numeric',   // Tahun
      timeZone: 'Asia/Jakarta',
    });
    const formattedTime = time.toLocaleTimeString('id-ID', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    return `${formattedDate}, ${formattedTime}`;
  };
   

  
    const { data }  = useFetchMe()
    // console.log(data)

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
            {breadcrumb.map((crumb, index) => (
              <li
                key={index}
                className={`breadcrumb-item text-sm ${index === breadcrumb.length - 1 ? 'text-white active' : 'text-white'}`}
                aria-current={index === breadcrumb.length - 1 ? 'page' : undefined}
              >
                {index === breadcrumb.length - 1 ? (
                  crumb.label
                ) : (
                  <a className="opacity-5 text-white" href={crumb.href}>
                    {crumb.label}
                  </a>
                )}
              </li>
            ))}
          </ol>
              <h6 className="font-weight-bolder text-white mb-0">{formatTime(currentTime)}</h6>
            </nav>
            <div
              className="collapse navbar-collapsee mt-sm-0 mt-2 me-md-0 me-sm-4 gap-2"
              id="navbar"
            >
              {/* <div className="ms-md-auto pe-md-3 d-flex align-items-center">
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
              </div> */}
              <ul className="navbar-nav justify-content-end flex-nowrap flex-row ms-auto">
                <li className="nav-item d-flex align-items-center">
                  <a
                    href="#"
                    className="nav-link text-white font-weight-bold px-0"
                  >
                    <i className="fa fa-user me-sm-1"></i> 
                    <span className="d-sm-inline d-none">{data?.data.user.nama}</span>
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
    toggleSidebar: PropTypes.func.isRequired,
    breadcrumb: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string ,
        href: PropTypes.string
      })
    ) 
}

export default Navbar