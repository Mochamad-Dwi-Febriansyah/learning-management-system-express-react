import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCreateGuru = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')
            const guruResponse = await axiosInstance.post('/guru', body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return guruResponse
        },
        onError,
        onSuccess
    })
}  
