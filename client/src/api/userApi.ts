    import axios from "axios";

    const axiosInstance = axios.create({
        baseURL: "http://localhost:3000/",  
        withCredentials: true,

    })

    export const userApi = {
        addUser: async (user: {
            userName: string;
            userPassword: string;
            userEmail: string;
          }): Promise<{ status: number; data: any }> => {
            try {
              const response = await axiosInstance.post("/sign-up", user);
              const { status, data } = response;
              // Return an object that the caller expects
              return { status, data };
            } catch (error) {
              // Throw error so the calling code can catch it
              throw error;
            }
          },

        logInUser: async(user : {
          username: string;
          password: string;
        }) =>{
            const response = (await axiosInstance.post("/api/auth/localuser", user)).data;
            return response;
        },

        getUserSession: async() => {
            const response =(await axiosInstance.get("/api/auth/status")).data;
            return response;
        }

    };

    

        