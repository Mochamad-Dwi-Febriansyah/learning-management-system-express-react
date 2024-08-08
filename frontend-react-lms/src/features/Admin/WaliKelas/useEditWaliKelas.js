import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useEditWaliKelas = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')
            const waliKelasResponse = await axiosInstance.put(`/guru-kelas/${body.id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(waliKelasResponse)
            return waliKelasResponse
        },
        onError,
        onSuccess
    })
}