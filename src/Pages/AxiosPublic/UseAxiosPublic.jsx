import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://opedia-server.vercel.app/', 
    withCredentials: true
})

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;