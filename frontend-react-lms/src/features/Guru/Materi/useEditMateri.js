import { axiosInstance } from "../../../lib/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useEditMateri = ({onSuccess, onError}) => {
    return useMutation({ 
        mutationFn: async (body) => {
            const token = Cookies.get('token')
            // console.log(body)
            const materiResponse = await axiosInstance.put(`/materi/${body.id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", 
                },
            });
            // console.log(materiResponse)
            return materiResponse
        },
        onError,
        onSuccess
    })
}