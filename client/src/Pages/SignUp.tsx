import { useState,useEffect,useRef } from "react";
import { useUsers } from "../contexts/UserProvider";
import { useNavigate } from "react-router-dom";




export function SignUp () {
    const navigate = useNavigate();


    const { addUser, issuccess, resetSuccess, stringTaken, resetStringTaken} = useUsers();
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const usernameInputRef = useRef<HTMLInputElement | null>(null);
    const emailInputRef = useRef<HTMLInputElement | null>(null);
  

    useEffect(() => {
        if (issuccess) {
          navigate("/sign-in");
          resetSuccess();
          setUserName("");
          setUserPassword("");
          setUserEmail(""); 
          resetStringTaken(); 

        }
      }, [issuccess, resetSuccess]);

      useEffect(() => {
        if (stringTaken === "UQ_Players_username" && usernameInputRef.current) {
          usernameInputRef.current.setCustomValidity("Username is already taken.");
          usernameInputRef.current.reportValidity(); // Show validation error
        } else if (usernameInputRef.current) {
          usernameInputRef.current.setCustomValidity("");
        }
    
        if (stringTaken === "UQ_Players_email" && emailInputRef.current) {
          emailInputRef.current.setCustomValidity("Email is already registered.");
          emailInputRef.current.reportValidity(); // Show validation error
        } else if (emailInputRef.current) {
          emailInputRef.current.setCustomValidity("");
        }
      }, [stringTaken]);
        
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newUser = {
            userName: userName, // Make sure variable names match expected keys
            userPassword: userPassword,
            userEmail: userEmail,
        };
    
        
         await addUser(newUser);




    }

    return(

        <main className="h-full">
            <div className="flex h-full">
                <div className="flex flex-60/100 bg-[url(/centerBackground.png)] justify-center">
                    <div className="content-center w-[30%]">
                        <div className="h-fit bg-[white] p-[28px] rounded-[30px]">
                            <div className="flex items-center justify-center">
                            <img className="w-[100px] rounded-b-[30px]" src="/PokeIcon.png" />
                            <img className="w-[40%] right-[20px] relative" src="/LogoGif.gif" alt=""/>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Username</label>
                                <input
                                ref={usernameInputRef} 
                                type="text"
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your username"
                                onChange={(e) => {setUserName(e.target.value);
                                    e.target.setCustomValidity(''); 
                                    resetStringTaken();
                                }}
                                required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Email</label>
                                <input
                                ref={emailInputRef}
                                type="email"
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                                onChange={(e) => {
                                    setUserEmail(e.target.value);
                                    e.target.setCustomValidity(''); 
                                    resetStringTaken();
                                }}

                                required

                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Password</label>
                                <input
                                type="password"
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Create your password"
                                onChange={(e) => {setUserPassword(e.target.value);
                                    e.target.setCustomValidity(''); 
                                }}
                                required
                                onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Password Required')}
                                
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Confirm Password</label>
                                <input
                                type="password"
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm your password"
                                required
                                onChange={(e) => {
                                    if (e.target.value !== userPassword) {
                                        e.target.setCustomValidity('Passwords do not match'); // Show error if passwords don’t match
                                    } else {
                                        e.target.setCustomValidity(''); // Reset error if they match
                                    }
                                }}
                                onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Password does not match')}
                        
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            >
                                Sign Up
                            </button>
                            </form>

                        </div>

                    </div>
                    
                </div>

            </div>
            
        </main>


    )

}