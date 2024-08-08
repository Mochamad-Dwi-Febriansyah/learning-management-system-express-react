import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useEditMataPelajaran = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')
            const mataPelajaranResponse = await axiosInstance.put(`/mata-pelajaran/${body.id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(mataPelajaranResponse)
            return mataPelajaranResponse
        },
        onError,
        onSuccess
    })
}