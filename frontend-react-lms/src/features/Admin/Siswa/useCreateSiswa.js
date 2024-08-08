import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCreateSiswa = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')
            const siswaResponse = await axiosInstance.post('/siswa', body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return siswaResponse
        },
        onError,
        onSuccess
    })
}  
