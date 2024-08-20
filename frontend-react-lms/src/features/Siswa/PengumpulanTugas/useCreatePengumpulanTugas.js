import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCreatePengumpulanTugas = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            // console.log(body)
            const token = Cookies.get('token')  
            const tugasResponse = await axiosInstance.post('/pengumpulan-tugas', body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                     "Content-Type": "multipart/form-data", 
                },
            });
            // console.log(body)
            return tugasResponse
        },
        onError,
        onSuccess
    })
}  