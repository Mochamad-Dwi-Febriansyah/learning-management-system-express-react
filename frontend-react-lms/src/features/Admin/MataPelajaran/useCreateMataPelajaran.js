import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCreateMataPelajaran = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')
            const mataPelajaranResponse = await axiosInstance.post('/mata-pelajaran', body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return mataPelajaranResponse
        },
        onError,
        onSuccess
    })
}  
