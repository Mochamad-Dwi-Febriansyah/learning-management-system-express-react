import ListSidebarItem from "../../../atoms/ListSidebarItem/Index.jsx"
import { ALogout } from '../../../../features/Auth/useLogout.js'; // Import fungsi logout Anda

const GuruListSidebar = () => {
    const logoutMutation = ALogout(); // Panggil hook logout
  
    const handleLogout = () => {
      logoutMutation.mutate(); // Jalankan fungsi logout ketika tombol di-klik
    };
    return (
        <> 
        <ul className="navbar-nav">
            <ListSidebarItem linkTo="/dashboard" Icon="ni ni-tv-2" Text="Dashboard" /> 
            <li className="nav-item mt-3">
                <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
                    Account pages
                </h6>
            </li>
            <ListSidebarItem linkTo="/profile" Icon="ni ni-single-02" Text="Profile" />
            <div onClick={handleLogout}>
                <ListSidebarItem  Icon="fas fa-sign-out-alt" Text="Logout" />
            </div>
        </ul>
        </>
    )
}

export default GuruListSidebar