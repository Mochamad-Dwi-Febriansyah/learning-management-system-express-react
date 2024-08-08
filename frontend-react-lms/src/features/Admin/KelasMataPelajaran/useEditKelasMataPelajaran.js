import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useEditKelasMataPelajaran = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')
            const kelasMataPelajaranResponse = await axiosInstance.put(`/kelas-mata-pelajaran/${body.id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(kelasMataPelajaranResponse)
            return kelasMataPelajaranResponse
        },
        onError,
        onSuccess
    })
}