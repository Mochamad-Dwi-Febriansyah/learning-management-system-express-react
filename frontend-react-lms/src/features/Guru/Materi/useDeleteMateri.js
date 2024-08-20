import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useDeleteMateri = ({onSuccess}) => {
    return useMutation({
        mutationFn: async (id) => {
            const token = Cookies.get('token')
            const materiResponse = await axiosInstance.delete(`/materi/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return materiResponse
        },
        onSuccess
    })
}