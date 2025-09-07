import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",  
    withCredentials: true,

})

export const authApi = {
    checkAuth : async() => {
        const response = (await axiosInstance.get("/api/auth/status")).data;
        return response;
    }
}