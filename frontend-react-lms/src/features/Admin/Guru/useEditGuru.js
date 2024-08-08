import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useEditGuru = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')
            const guruResponse = await axiosInstance.put(`/guru/${body.id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(guruResponse)
            return guruResponse
        },
        onError,
        onSuccess
    })
}