import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useDeleteWaliKelas = ({onSuccess}) => {
    return useMutation({
        mutationFn: async (id) => {
            const token = Cookies.get('token')
            const waliKelasResponse = await axiosInstance.delete(`/guru-kelas/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return waliKelasResponse
        },
        onSuccess
    })
}