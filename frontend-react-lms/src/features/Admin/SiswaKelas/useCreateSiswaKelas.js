import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCreateSiswaKelas = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')
            const siswaKelasResponse = await axiosInstance.post('/siswa-kelas', body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return siswaKelasResponse
        },
        onError,
        onSuccess
    })
}  
