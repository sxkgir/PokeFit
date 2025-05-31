import { HomePage } from '../Pages/HomePage'
import { App } from '../App'
import { SignInPage } from '../Pages/signInPage';
import { SignUp } from '../Pages/SignUp';
import { DashboardUI } from '../components/UI/DashboardUI';
import { NewPlayerPage } from '../Pages/NewPlayerPage';
import { element } from 'three/tsl';
import { LeaderboardPage } from '../Pages/Leaderboard';
import RulesPage from '../Pages/RulePage';
const routes = [
    {
        path: "",
        element: <App />,
        children: [
            {
                path:"/",
                element: <HomePage />
            },
            {
                path: "/sign-in",
                element: <SignInPage />
            },
            {
                path: "/sign-up",
                element: <SignUp />
            },
            {
                path: "/new-player",
                element: <NewPlayerPage />

            },
            {
                path: "/leaderboard",
                element:  <LeaderboardPage />

            },
            {
                path: "/rules",
                element: <RulesPage />

            },
            {
                path: "/dashboard",
                element: <DashboardUI />
            },
            
        
        ]



    }

]

export default routes;
