import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useEditSiswa = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')
            const siswaResponse = await axiosInstance.put(`/siswa/${body.id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(siswaResponse)
            return siswaResponse
        },
        onError,
        onSuccess
    })
}