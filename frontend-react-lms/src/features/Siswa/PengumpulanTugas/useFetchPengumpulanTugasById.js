import { axiosInstance } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';

export const useFetchPengumpulanTugasById = () => {
    const { tugas_id } = useParams(); 
    // const tugas_id = parseInt(id) 
    return useQuery({
        queryKey: ['pengumpulanTugas', tugas_id],
        queryFn: async () => {
            const token = Cookies.get('token')
            const tugasResponse = await axiosInstance.get(`/pengumpulan-tugas/tugas/${tugas_id}/siswa`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Tambahkan token ke header
                },
            });  
            return tugasResponse
        },
        enabled: !!tugas_id, // Hanya jalankan query jika tugas_id tersedia
        staleTime: 5 * 60 * 1000, // Cache data selama 5 menit
        cacheTime: 30 * 60 * 1000,  // Cache akan bertahan selama 30 menit setelah data tidak digunakan
        retry: 1, // Tidak perlu retry jika terjadi error
    })
}