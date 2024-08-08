import { useEffect } from "react"
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        Cookies.remove('token')

        navigate("/")

        window.location.reload()
    }, [navigate])

    return null
}

export default Logout