import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCreateWaliKelas = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')
            const waliKelasResponse = await axiosInstance.post('/guru-kelas', body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return waliKelasResponse
        },
        onError,
        onSuccess
    })
}  
