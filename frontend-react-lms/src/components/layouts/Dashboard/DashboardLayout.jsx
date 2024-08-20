import { useState } from "react"
import Sidebar from "../../organisms/Sidebar/Index"
import Navbar from "../../organisms/Navbar/Index"
import PropTypes from "prop-types"

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <>
            <div className="bg-nature min-height-230 bg-primary position-absolute w-100"></div>
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <main className="main-content position-relative border-radius-lg">
                {/* <Navbar  isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/> */}
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    breadcrumb={[ 
                        { label: 'Dashboard', href: '/dashboard' }
                    ]}
                />
                {children}
            </main>
        </>
    )
}
DashboardLayout.propTypes = {
    children: PropTypes.node,
};

export default DashboardLayout