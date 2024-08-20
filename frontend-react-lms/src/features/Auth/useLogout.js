 import { useNavigate } from "react-router-dom";  
import { axiosInstance } from "../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const ALogout = () => {
    const navigate = useNavigate()
    return useMutation({ 
        mutationFn: async () => {
            const token = Cookies.get('token')  
            const logoutResponse = await axiosInstance.post('/auth/logout', {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            return logoutResponse
        },
        onSuccess: () => {
            navigate("/")
        }
    })
}  