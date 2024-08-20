import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCreateTugas = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token') 
            // console.log(body.get('dokumen_tugas'))
            const tugasResponse = await axiosInstance.post('/tugas', body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                     "Content-Type": "multipart/form-data", 
                },
            });
            return tugasResponse
        },
        onError,
        onSuccess
    })
}  
