import { axiosInstance } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';

export const useFetchPostingan = () => {

    // const sessionData = sessionStorage.getItem('kelas_data')
    // const kelasData = sessionData ? JSON.parse(sessionData) : null; 

    // const kelas_id = kelasData ? kelasData.kelas_id : null;  
    const { kelas_id , mata_pelajaran_id } = useParams(); 
    // const mata_pelajaran_id = parseInt(id) 
    return useQuery({
        queryKey: ['postingan', kelas_id , mata_pelajaran_id],
        queryFn: async () => { 
            const token = Cookies.get('token') 
            const postinganResponse = await axiosInstance.get(`/postingan/kelas/${kelas_id}/mata_pelajaran/${mata_pelajaran_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Tambahkan token ke header
                },
            });  
            // console.log(postinganResponse)
            return postinganResponse
        },  
        enabled: !!kelas_id && !!mata_pelajaran_id, // Hanya jalankan query jika tugas_id tersedia
        staleTime: 5 * 60 * 1000, // Cache data selama 5 menit
        cacheTime: 30 * 60 * 1000,  // Cache akan bertahan selama 30 menit setelah data tidak digunakan
        retry: 1, // Tidak perlu retry jika terjadi error
    })
}