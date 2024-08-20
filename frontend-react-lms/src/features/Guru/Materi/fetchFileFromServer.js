import { axiosInstance } from "../../../lib/axios";
import Cookies from "js-cookie";

export const fetchFileFromServer = async (fileName) => {
    try {
        const token = Cookies.get('token'); 
        const response = await axiosInstance.get(`materi/download/${fileName}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },{
            responseType: 'blob', // Mendapatkan data sebagai blob
        });
        const file = new File([response.data], fileName, { type: response.headers['content-type'] });
        // console.log(file)
        return file;
    } catch (error) {
        console.error('Error fetching file:', error);
        return null;
    }
}

