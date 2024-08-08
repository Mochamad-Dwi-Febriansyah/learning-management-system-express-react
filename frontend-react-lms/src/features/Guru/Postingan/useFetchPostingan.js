import { axiosInstance } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';

export const useFetchPostingan = () => {
    const { mata_pelajaran_id } = useParams(); 
    // const mata_pelajaran_id = parseInt(id) 
    return useQuery({
        queryKey: ['postingan'],
        queryFn: async () => {
            const token = Cookies.get('token')
            const postinganResponse = await axiosInstance.get(`/postingan/mata_pelajaran/${mata_pelajaran_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Tambahkan token ke header
                },
            });  
            return postinganResponse
        }
    })
}