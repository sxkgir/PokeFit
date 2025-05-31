import { useEffect, useState } from "react";
import { useUsers } from "../contexts/UserProvider";
import { Navigate } from "react-router";
import { usePlayer } from "../contexts/PlayerProvider";

export default function AuthRoute({ children }: { children: React.ReactElement }) {
  const { isLoggedIn, checkAuth, userID } = useUsers();
  const { isNewPlayer, getPlayer } = usePlayer();
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

  

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    if (!playerFetched || isNewPlayer === null) {
      return <div>Loading...</div>;
    }
    return isNewPlayer ? (
      <Navigate to="/new-player" replace={true} />
    ) : (
      <Navigate to="/dashboard" replace={true} />
    );
  }

  return <>{children}</>;
}
