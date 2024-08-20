import { Navigate, Outlet } from "react-router-dom"
import { getRoleFromToken } from "../../utils/auth.js"
import PropTypes from "prop-types";
import Cookies from 'js-cookie';
import Forbidden from "./Forbidden.jsx";

const ProtectedRoutes = ({requiredRole}) => {
    const token = Cookies.get('token')
    // console.log(token)
    if(!token){
        return <Navigate to='/' />
    }
    const role = getRoleFromToken()
    // console.log(requiredRole)
    if (!role) {
        return <Navigate to='/' />
    }

    if(requiredRole && role !== requiredRole){
        return <Forbidden />
    }

    return <Outlet/>
}

ProtectedRoutes.propTypes = {
    requiredRole: PropTypes.string
}

export default ProtectedRoutes