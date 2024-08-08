import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useEditSiswaKelas = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')
            const siswaKelasResponse = await axiosInstance.put(`/siswa-kelas/${body.id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(siswaKelasResponse)
            return siswaKelasResponse
        },
        onError,
        onSuccess
    })
}