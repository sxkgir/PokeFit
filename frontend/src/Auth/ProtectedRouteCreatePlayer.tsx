import { useEffect,useState } from "react";
import { useUsers } from "../contexts/UserProvider";
import { Navigate } from "react-router";
import { usePlayer } from "../contexts/PlayerProvider";

export default function ProtectedRouteCreatePlayer({children} : {children : React.ReactElement}) {
    const { isLoggedIn,checkAuth, userID } = useUsers();
    const { isNewPlayer,getPlayer} = usePlayer();
    const [authChecked, setAuthChecked] = useState(false);
    const [playerFetched, setPlayerFetched] = useState(false);


    useEffect(() => {
        async function checkAuthentication() {
          await checkAuth();
          setAuthChecked(true);
        }
        checkAuthentication();
    }, [checkAuth]);
    
    useEffect(() => {
        async function fetchPlayer() {
          if (!authChecked) return; 
          if (userID) {
            await getPlayer(userID);
          }
          setPlayerFetched(true);
        }
        fetchPlayer();
      }, [userID, getPlayer, authChecked]);
    
      


    if (!authChecked || !playerFetched) {
        return <div>Loading...</div>;
    }
        
    
    return(
            isLoggedIn && isNewPlayer ?
            <>{children}</>: <Navigate to="/" replace={true} /> 
            
    )
}

