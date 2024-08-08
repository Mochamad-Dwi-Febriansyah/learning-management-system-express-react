import ListSidebarItem from "../../../atoms/ListSidebarItem/Index.jsx"

const GuruListSidebar = () => {
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
            <ListSidebarItem linkTo="/logout" Icon="fas fa-sign-out-alt" Text="Logout" />
        </ul>
        </>
    )
}

export default GuruListSidebar