import { axiosInstance } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchSiswa = () => {
    return useQuery({
        queryKey: ['siswa'],
        queryFn: async () => {
            const token = Cookies.get('token')
            const siswaResponse = await axiosInstance.get('/siswa', {
                headers: {
                    Authorization: `Bearer ${token}`, // Tambahkan token ke header
                },
            });  
            return siswaResponse
        }
    })
}