import PlayerUsernameModal from "../components/UI/CreatePlayerUsernameModal";
import PokemonNameModal from "../components/UI/CreatePokemonModal";
import PokemonSelectModal from "../components/UI/SelectPokemonModal";
import { useEffect, useState } from "react";
import { usePlayer } from "../contexts/PlayerProvider";
import { useUsers } from "../contexts/UserProvider";
import JoinWorldButton from "../components/UI/JoinWorldButton";
import ProtectedRouteCreatePlayer from "../Auth/ProtectedRouteCreatePlayer";


export function NewPlayerPage() {

    const {setNewPlayerUsername, setPokemonName, setPokemonType, addPlayer, isNewPlayer} = usePlayer();
    const { userID } = useUsers();


    
    const [usernameSubmitted, setUsernameSubmitted] = useState(false);
    const [pokemonNameSubmitted, setPokemonNameSubmitted] = useState(false);
    const [pokemonTypeSubmitted, setPokemonTypeSubmitted] = useState(false);

    const handleUsernameSubmit = (username: string) => {
      setNewPlayerUsername(username);
      console.log('Player username:', username);
      setUsernameSubmitted(true);
    };

    const handlePokemonNameSubmit = (PokemonName: string) => {
        setPokemonName(PokemonName);
        console.log('Pokemon Name:', PokemonName);
        setPokemonNameSubmitted(true);
    };

    const handlePokemonTypeSubmit = (PokemonType : string) => {
        setPokemonType(PokemonType);
        console.log('Pokemon Type:', PokemonType);
        setPokemonTypeSubmitted(true);
    }

    useEffect(() => {
        if (pokemonTypeSubmitted) {
          (async () => {
            console.log("hi");
            await addPlayer(userID);
          })();
        }
      }, [pokemonTypeSubmitted]);
      
  
    return(
            <ProtectedRouteCreatePlayer>
                

                <main className="bg-[url('/Create_Background.jpeg')]  bg-cover bg-center z-50 h-screen">
                {  !pokemonNameSubmitted  &&
                        <PlayerUsernameModal 
                            onSubmit={handleUsernameSubmit}
                        />
                }
                {
                    !pokemonNameSubmitted && usernameSubmitted &&
                        <PokemonNameModal 
                        onSubmit={handlePokemonNameSubmit}
                        />
                }
                {
                    !pokemonTypeSubmitted && usernameSubmitted && pokemonNameSubmitted &&
                    <PokemonSelectModal
                        onSubmit={handlePokemonTypeSubmit}
                    />
                }
                <JoinWorldButton />

                </main>
            </ProtectedRouteCreatePlayer>
        


        
    )


}