import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useDeleteKelasMataPelajaran = ({onSuccess}) => {
    return useMutation({
        mutationFn: async (id) => {
            const token = Cookies.get('token')
            const kelasMataPelajaranResponse = await axiosInstance.delete(`/kelas-mata-pelajaran/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return kelasMataPelajaranResponse
        },
        onSuccess
    })
}