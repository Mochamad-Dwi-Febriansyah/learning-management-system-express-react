import { axiosInstance } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchMataPelajaran = () => {
    return useQuery({
        queryKey: ['mataPelajaran'],
        queryFn: async () => {
            const token = Cookies.get('token')
            const mataPelajaranResponse = await axiosInstance.get('/mata-pelajaran', {
                headers: {
                    Authorization: `Bearer ${token}`, // Tambahkan token ke header
                },
            });  
            return mataPelajaranResponse
        }
    })
}