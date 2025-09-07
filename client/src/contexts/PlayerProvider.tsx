import { createContext, useContext, useState, ReactNode,Dispatch, SetStateAction } from "react";
import { playerAPI } from "../api/playerApi";



interface PlayerContextType{
    getPlayer: (userID : string) => Promise<void>
    setNewPlayerUsername: Dispatch<SetStateAction<string>>;
    setPokemonName: Dispatch<SetStateAction<string>>;
    setPokemonType: Dispatch<SetStateAction<string>>;
    addPlayer: (userID : string) => Promise<void>
    isNewPlayer: boolean | null;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);



export function PlayerProvider({children} : {children : ReactNode}){
    const [isNewPlayer, setNewPlayer] = useState<boolean | null>(null);
    const [newPlayerUsername, setNewPlayerUsername] = useState("");
    const [newPokemonName, setPokemonName] = useState("");
    const [newPokemonType, setPokemonType] = useState("");


    const getPlayer = async (userID: string) => {
        try {
          const response = await playerAPI.getPlayer(userID);
          console.log("Player fetched:", response);
          setNewPlayer(response.newPlayer);
        } catch (error: any) {
          console.log("Error fetching player:", error.response?.data);
          if (error.response?.data?.newPlayer) {
            console.log("Setting new player to true");
            setNewPlayer(true);
          }
        }
      };
      

    const addPlayer = async(userID : string) => {
        console.log("hi trying add player");
        try{


            const newPlayerData = {
                playerID : userID,
                username : newPlayerUsername,
                pokemon_name : newPokemonName,
                pokemon_type : newPokemonType,
                pokemon_experience : 0,
            }

            const response = await playerAPI.addPlayer(newPlayerData);
            console.log("Added Player")
            console.log(response);
        }
        catch(error){
            console.log("Server error: ", error);

        }
    }

    return(
        <PlayerContext.Provider value={{
            getPlayer,
            setNewPlayerUsername,
            setPokemonName,
            setPokemonType,
            addPlayer,
            isNewPlayer,

        }}>
            {children}
        </PlayerContext.Provider>
    )

}
export function usePlayer(){
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error("usePlayer must be used within a PlayerProvider");
    }
    return context; 
}