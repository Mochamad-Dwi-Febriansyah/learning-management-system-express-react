import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCreateKelas = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')
            const kelasResponse = await axiosInstance.post('/kelas', body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return kelasResponse
        },
        onError,
        onSuccess
    })
}  
