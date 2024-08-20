import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCreateMateri = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token') 
            // console.log(body.get('dokumen_materi'))
            const materiResponse = await axiosInstance.post('/materi', body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                     "Content-Type": "multipart/form-data", 
                },
            });
            return materiResponse
        },
        onError,
        onSuccess
    })
}  
