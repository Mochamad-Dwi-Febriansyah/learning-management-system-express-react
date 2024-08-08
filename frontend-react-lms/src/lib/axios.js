import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
    // baseURL: "https://api.belajar-bersama.com/api",
    baseURL: "http://localhost:3000/api",
})

// Interceptor untuk menangani respons error
axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        // Jika status code 401, arahkan ke halaman login
        // const navigate = useNavigate();
        // navigate("/")
        window.location.replace('/');
        Cookies.remove('token')
      }
      return Promise.reject(error);
    }
  );
 