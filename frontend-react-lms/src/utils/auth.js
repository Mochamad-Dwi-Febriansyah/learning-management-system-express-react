import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getRoleFromToken = () => {
    const token = Cookies.get('token')

    if(token) {
        try {
            const decodeToken = jwtDecode(token)
            return decodeToken.user_type
        } catch (error) {
            console.error('Invalid token', error)
            return null
        }
    }
    return null
}