import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useDeleteKelas = ({onSuccess}) => {
    return useMutation({
        mutationFn: async (id) => {
            const token = Cookies.get('token')
            const kelasResponse = await axiosInstance.delete(`/kelas/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return kelasResponse
        },
        onSuccess
    })
}