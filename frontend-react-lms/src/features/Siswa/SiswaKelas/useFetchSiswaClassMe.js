import { axiosInstance } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchSiswaClassMe = () => {
    return useQuery({
        queryKey: ['siswaKelasMe'],
        queryFn: async () => {
            const token = Cookies.get('token')
            const siswaKelasmeResponse = await axiosInstance.get('/siswa-kelas/siswa-kelas-me', {
                headers: {
                    Authorization: `Bearer ${token}`, // Tambahkan token ke header
                },
            });  
            return siswaKelasmeResponse
        }
    })
}