import { axiosInstance } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchSiswaKelas = () => {
    return useQuery({
        queryKey: ['siswaKelas'],
        queryFn: async () => {
            const token = Cookies.get('token')
            const siswaKelasResponse = await axiosInstance.get('/siswa-kelas', {
                headers: {
                    Authorization: `Bearer ${token}`, // Tambahkan token ke header
                },
            });  
            return siswaKelasResponse
        }
    })
}