import { axiosInstance } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';

export const useFetchTugasDetail = () => {
    const { tugas_id } = useParams(); 
    // const tugas_id = parseInt(id) 
    return useQuery({
        queryKey: ['tugas'],
        queryFn: async () => {
            const token = Cookies.get('token')
            const tugasResponse = await axiosInstance.get(`/tugas/${tugas_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Tambahkan token ke header
                },
            });  
            return tugasResponse
        }
    })
}