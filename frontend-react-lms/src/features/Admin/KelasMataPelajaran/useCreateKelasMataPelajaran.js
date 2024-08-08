import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCreateKelasMataPelajaran = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')
            const kelasMataPelajaranResponse = await axiosInstance.post('/kelas-mata-pelajaran', body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return kelasMataPelajaranResponse
        },
        onError,
        onSuccess
    })
}  
