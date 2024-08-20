import { axiosInstance } from '../../../lib/axios';
import Cookies from "js-cookie";

export const downloadMateri = async (filename) => {
    try {
        const token = Cookies.get('token'); 
        const response = await axiosInstance.get(`materi/download/${filename.fileUrl}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: 'blob', // Receive the data as a blob
        });

        // Create a URL for the blob and trigger a download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename.fileUrl); // Set the file name for download
        document.body.appendChild(link);
        link.click(); // Programmatically trigger a click event to start download
        link.remove(); // Clean up by removing the link
        window.URL.revokeObjectURL(url); // Clean up the blob URL
    } catch (error) {
        console.error('Error downloading the file:', error);
    }
};
