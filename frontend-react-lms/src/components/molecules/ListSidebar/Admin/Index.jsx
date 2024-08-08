import ListSidebarItem from "../../../atoms/ListSidebarItem/Index.jsx"
import { useState, useEffect,useCallback  } from 'react';
import { useLocation } from 'react-router-dom';

const AdminListSidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

        // Check if the current URL is active
        const checkIfActive = useCallback((path) => location.pathname.startsWith(path), [location.pathname]);

        // Open dropdown if any of the links inside it are active
        useEffect(() => {
            if (checkIfActive('/kelola-kelas') || checkIfActive('/kelola-mata-pelajaran')) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        }, [checkIfActive]);
    return (
        <>
            <ul className="navbar-nav">
                <ListSidebarItem linkTo="/dashboard" Icon="ni ni-tv-2" Text="Dashboard" />
                <ListSidebarItem linkTo="/kelola-siswa" Icon="ni ni-calendar-grid-58" Text="Manage Siswa" />
                <ListSidebarItem linkTo="/kelola-guru" Icon="ni ni-calendar-grid-58" Text="Manage Guru" />
                 <li className="nav-item">
                    <a
                        className={`nav-link ${isOpen ? '' : 'collapsed'}`}
                        role="button"
                        aria-expanded={isOpen}
                        aria-controls="dropdownMenu"
                        onClick={toggleDropdown}
                    >
                        <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i className="ni ni-folder-17 text-primary"></i>
                        </div>
                        <span className="nav-link-text ms-1">Academies</span>
                        <span className={`dropdown-arrow ${isOpen ? 'arrow-rotate' : ''}`}>
                            <i className={`fa ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                        </span>
                    </a>
                    <div className={`dropdown-content ${isOpen ? 'open' : ''}`} id="dropdownMenu">
                        <ul className="nav nav-sm flex-column ms-3">
                            <ListSidebarItem linkTo="/kelola-kelas" Icon="ni ni-calendar-grid-58" Text="Kelas" />
                            <ListSidebarItem linkTo="/kelola-mata-pelajaran" Icon="ni ni-calendar-grid-58" Text="Mata Pelajaran" />
                            <ListSidebarItem linkTo="/kelola-kelas-mata-pelajaran" Icon="ni ni-calendar-grid-58" Text="Kelas Mata Pelajaran" />
                            <ListSidebarItem linkTo="/kelola-siswa-kelas" Icon="ni ni-calendar-grid-58" Text="Siswa Kelas" />
                            <ListSidebarItem linkTo="/kelola-wali-kelas" Icon="ni ni-calendar-grid-58" Text="Wali Kelas" />
                        </ul>
                    </div>
                </li>
                <li className="nav-item mt-3">
                    <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
                        Account pages
                    </h6>
                </li>
                <ListSidebarItem linkTo="/profile" Icon="ni ni-single-02" Text="Profile" />
                <ListSidebarItem linkTo="/logout" Icon="fas fa-sign-out-alt" Text="Logout" />
               
            </ul>
        </>
    )
}

export default AdminListSidebar