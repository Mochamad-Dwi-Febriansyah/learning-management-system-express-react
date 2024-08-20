import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useEditPengumpulanTugas = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => { 
            const token = Cookies.get('token')  
            const tugasResponse = await axiosInstance.put(`/pengumpulan-tugas/${body.id}/guru`, body, {
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