const passport = require("passport");
const { findUser, findDiscordUser } = require("../db/PlayerQuery");

passport.serializeUser((user, done) => {
    const sessionUser = {
      id: user.provider === "local" ? user.username : user.discord_id,
      provider: user.provider 
    };
    console.log("Serialize user");
    console.log(user);
    done(null, sessionUser);
});

passport.deserializeUser(async (sessionUser, done) => {
    console.log("deserialize user");
    console.log("deserialize user", sessionUser.id);

    try {
      let user;
      if (sessionUser.provider === "discord") {
        user = await findDiscordUser(sessionUser.id);
        user.provider = 'discord';
      } else if (sessionUser.provider === "local") {
        user = await findUser(sessionUser.id);
        user.provider = 'local';

      }
      if (!user) {
        return done(new Error("User not found"), null);
      }
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
  
module.exports = passport;
  
  