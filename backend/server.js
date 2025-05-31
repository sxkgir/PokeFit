const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./db/PlayerDB.js");
const UserEntryRoutes = require("./routes/UserEntryRoutes.js");
const PlayerEntryRoutes = require("./routes/PlayerEntryRoutes.js");
const passport = require("passport");
require("./strategies/passportConfig.js");
require("./strategies/DiscordStrategy.js");
require("./strategies/LocalStrategy.js");   

const session = require("express-session");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );




connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed. Server not started.", err);
    });




app.use(
    session({
        secret: "PokeFit Secret",
        saveUninitialized: false,  
        resave:false,
        cookie: {
            maxAge: 80000 * 10,      
        },
    })
)
    
app.use(
    passport.initialize());
app.use(passport.session());

app.use("/", UserEntryRoutes);
app.use("/api/player", PlayerEntryRoutes);


app.user

app.post("/api/auth/localuser", (req, res, next) => {
    //You pass a callback to passport.authenticate("local", callback). 
    // This allows you to manually handle errors and responses from the passport if there is one

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return res.status(401).json({ error: err.message, InvalidCredential: true });
      }
      
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.sendStatus(200);
      });
    })(req, res, next);
  });
  
app.get(
    "/api/auth/status",
    (request,response) =>{
        if(request.isAuthenticated()){
            response.json({loggedIn: true, user: request.user, provider: request.provider});
        }
        else{
            response.status(401).json({loggedIn: false});
        }
    }
)

app.get("/api/auth/discord", passport.authenticate("discord"));
app.get(
    "/api/auth/discord/redirect", 
    passport.authenticate("discord"), 
    (request,response) => {
        console.log(request.session);
        console.log(request.user);
        if (request.user) return response.redirect("http://localhost:5173")         
        response.sendStatus(200);
    }
);




    



