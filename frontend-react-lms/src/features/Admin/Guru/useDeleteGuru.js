import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useDeleteGuru = ({onSuccess}) => {
    return useMutation({
        mutationFn: async (id) => {
            const token = Cookies.get('token')
            const guruResponse = await axiosInstance.delete(`/guru/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return guruResponse
        },
        onSuccess
    })
}