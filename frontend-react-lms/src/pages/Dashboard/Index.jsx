import DashboardLayout from "../../components/layouts/Dashboard/DashboardLayout.jsx"
import SiswaDashboard from "../../components/layouts/Dashboard/SiswaDashboard.jsx";
import GuruDashboard from "../../components/layouts/Dashboard/GuruDashboard.jsx";
import AdminDashboard from "../../components/layouts/Dashboard/AdminDashboard.jsx";
import Cookies from 'js-cookie'; 

const Dashboard = () => { 
    const userRole = Cookies.get('user_type');  

    const renderContent = () => {
        switch (userRole) {
            case "ADMIN":
                return <AdminDashboard/>
            case "GURU":
                return <GuruDashboard/>
            case "SISWA":
                return <SiswaDashboard/>
            default:
                return null
        }
    }
    return (
        <>
        <DashboardLayout>
            {renderContent()}
        </DashboardLayout>
        </>
    )
}

export default Dashboard