import { axiosInstance } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchKelas = () => {
    return useQuery({
        queryKey: ['kelas'],
        queryFn: async () => {
            const token = Cookies.get('token')
            const kelasResponse = await axiosInstance.get('/kelas', {
                headers: {
                    Authorization: `Bearer ${token}`, // Tambahkan token ke header
                },
            });  
            return kelasResponse
        }
    })
}