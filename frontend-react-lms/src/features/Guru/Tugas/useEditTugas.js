import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useEditTugas = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')
            // console.log(body)
            const tugasResponse = await axiosInstance.put(`/tugas/${body.id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", 
                },
            });
            // console.log(tugasResponse)
            return tugasResponse
        },
        onError,
        onSuccess
    })
}