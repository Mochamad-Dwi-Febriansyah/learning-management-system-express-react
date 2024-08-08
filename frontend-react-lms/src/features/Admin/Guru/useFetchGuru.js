import { axiosInstance } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchGuru = () => {
    return useQuery({
        queryKey: ['guru'],
        queryFn: async () => {
            const token = Cookies.get('token')
            const guruResponse = await axiosInstance.get('/guru', {
                headers: {
                    Authorization: `Bearer ${token}`, // Tambahkan token ke header
                },
            });  
            return guruResponse
        }
    })
}