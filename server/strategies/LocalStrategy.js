    const passport = require("passport");
    const { Strategy } = require("passport-local");
    const { logInUser } = require("../db/PlayerQuery");


    passport.use(
        new Strategy( async (username, password, done) => {
            console.log(`Username : ${username}`);
            try{
                const userToQuery = {
                    username: username,
                    password: password
                }
                const user = await logInUser(userToQuery);
                if(!user){                
                    const error = new Error("Invalid Credentials");
                    throw error;
                } 
                user.provider = "local";


                
                done(null, user);
            }
            catch(err){
                done(err,null); 
            }

        })
    )