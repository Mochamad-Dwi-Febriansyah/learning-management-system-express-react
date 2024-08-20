import { axiosInstance } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchMe = () => {
    return useQuery({
        queryKey: ['auth-me'],
        queryFn: async () => {
            const token = Cookies.get('token')
            const meResponse = await axiosInstance.get('/auth/auth-me', {
                headers: {
                    Authorization: `Bearer ${token}`, // Tambahkan token ke header
                },
            });  
            return meResponse
        }, 
        staleTime: 5 * 60 * 1000, // Cache data selama 5 menit
        cacheTime: 30 * 60 * 1000,  // Cache akan bertahan selama 30 menit setelah data tidak digunakan
        retry: 1, // Tidak perlu retry jika terjadi error
    })
}