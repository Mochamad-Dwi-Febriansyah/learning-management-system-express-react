import { axiosInstance } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchClassMe = () => {
    return useQuery({
        queryKey: ['waliKelas'],
        queryFn: async () => {
            const token = Cookies.get('token')
            const waliKelasResponse = await axiosInstance.get('/guru-kelas/me', {
                headers: {
                    Authorization: `Bearer ${token}`, // Tambahkan token ke header
                },
            });  
            return waliKelasResponse
        }
    })
}