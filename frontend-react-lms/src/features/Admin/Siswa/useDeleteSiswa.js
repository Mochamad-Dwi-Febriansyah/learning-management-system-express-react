import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useDeleteSiswa = ({onSuccess}) => {
    return useMutation({
        mutationFn: async (id) => {
            const token = Cookies.get('token')
            const siswaResponse = await axiosInstance.delete(`/siswa/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return siswaResponse
        },
        onSuccess
    })
}