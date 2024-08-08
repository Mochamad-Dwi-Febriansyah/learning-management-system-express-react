import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useDeleteSiswaKelas = ({onSuccess}) => {
    return useMutation({
        mutationFn: async (id) => {
            const token = Cookies.get('token')
            const siswaKelasResponse = await axiosInstance.delete(`/siswa-kelas/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return siswaKelasResponse
        },
        onSuccess
    })
}