import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useEditPostingan = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')
            const postinganResponse = await axiosInstance.put(`/postingan/${body.id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(postinganResponse)
            return postinganResponse
        },
        onError,
        onSuccess
    })
}