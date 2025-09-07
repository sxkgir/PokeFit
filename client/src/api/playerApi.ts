import axios  from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",  
    withCredentials: true
});

interface newPlayer {
    playerID : string;
    username: string;
    pokemon_name: string;
    pokemon_type: string;
    pokemon_experience: number;
}


export const playerAPI = {

    getPlayer : async(userID : string) => {
        const response = (await axiosInstance.get(`/api/player/${userID}`)).data;
        return response;
    },

    addPlayer : async(newPlayer : newPlayer) => {
        const response = (await axiosInstance.post(`/api/player/create`,newPlayer)).data;
        return response;
    }





}