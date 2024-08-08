import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useDeletePostingan = ({onSuccess}) => {
    return useMutation({
        mutationFn: async (id) => {
            const token = Cookies.get('token')
            const postinganResponse = await axiosInstance.delete(`/postingan/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return postinganResponse
        },
        onSuccess
    })
}