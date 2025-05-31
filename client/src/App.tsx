import { Outlet } from "react-router-dom";
import { UserProvider } from "./contexts/UserProvider";
import { PlayerProvider } from "./contexts/PlayerProvider";
export function App() {


    return(
        <UserProvider>
            <PlayerProvider>
                <Outlet />
            </PlayerProvider>
        </UserProvider>
    );


}