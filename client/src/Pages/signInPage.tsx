import { SignInForm } from "../components/UI/signInForm";
import AuthRoute from "../Auth/authRoute";
export function SignInPage() {



    return(
        
        <AuthRoute>
            <SignInForm />
        </AuthRoute>

            

    );




}