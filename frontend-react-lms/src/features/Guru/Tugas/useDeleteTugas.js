import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useDeleteTugas = ({onSuccess}) => {
    return useMutation({
        mutationFn: async (id) => {
            const token = Cookies.get('token')
            const tugasResponse = await axiosInstance.delete(`/tugas/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return tugasResponse
        },
        onSuccess
    })
}