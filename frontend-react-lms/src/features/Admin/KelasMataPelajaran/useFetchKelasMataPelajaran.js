import { axiosInstance } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchKelasMataPelajaran = () => {
    return useQuery({
        queryKey: ['kelasMataPelajaran'],
        queryFn: async () => {
            const token = Cookies.get('token')
            const kelasMataPelajaranResponse = await axiosInstance.get('/kelas-mata-pelajaran', {
                headers: {
                    Authorization: `Bearer ${token}`, // Tambahkan token ke header
                },
            });  
            return kelasMataPelajaranResponse
        }
    })
}