const passport = require("passport");
var DiscordStrategy = require('passport-discord').Strategy;
const { findDiscordUser, createDiscordUser } = require("../db/PlayerQuery");

const dotenv = require('dotenv');
dotenv.config();

passport.use(
    new DiscordStrategy(
      {
        clientID: process.env.DISCORD_ID,
        clientSecret: process.env.DISCORD_SECRET,
        callbackURL: "http://localhost:3000/api/auth/discord/redirect",
        scope: ["identify", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        let findUser;
        try{
            findUser = await findDiscordUser(profile.id);

            if(findUser) {
                findUser.provider = "discord";
                done(null, findUser);
            }

            if(!findUser){
                const newDiscordUser = {
                    discordID: profile.id,
                    username: profile.username,
                };

                const addedUser = await createDiscordUser(newDiscordUser);
                done(null, addedUser)
            }

        }
        catch(err){
            done(err, null);
        }

      }
    )
  );
  
