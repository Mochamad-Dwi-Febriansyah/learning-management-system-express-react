import { axiosInstance } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const token = Cookies.get('token')
            const profileResponse = await axiosInstance.get('/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`, // Tambahkan token ke header
                },
            });  
            return profileResponse
        }, 
        staleTime: 5 * 60 * 1000, // Cache data selama 5 menit
        retry: false, // Tidak perlu retry jika terjadi error
    })
}