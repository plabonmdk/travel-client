import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://travel-server-roan.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
