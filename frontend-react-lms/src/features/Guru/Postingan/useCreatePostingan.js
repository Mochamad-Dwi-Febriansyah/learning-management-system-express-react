import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCreatePostingan = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')
            const postinganResponse = await axiosInstance.post('/postingan', body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return postinganResponse
        },
        onError,
        onSuccess
    })
}  
