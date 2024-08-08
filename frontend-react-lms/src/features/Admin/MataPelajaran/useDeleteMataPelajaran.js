import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useDeleteMataPelajaran = ({onSuccess}) => {
    return useMutation({
        mutationFn: async (id) => {
            const token = Cookies.get('token')
            const mataPelajaranResponse = await axiosInstance.delete(`/mata-pelajaran/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return mataPelajaranResponse
        },
        onSuccess
    })
}