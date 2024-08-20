import { axiosInstance } from "../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useLogin = ({onSuccess, onError}) => { 
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')  
            const loginResponse = await axiosInstance.post('/auth/login', body, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            return loginResponse
        },
       onError,
       onSuccess
    })
}  