const db = require("../db/PlayerQuery");

async function findPlayer(req,res) {
    try{
        console.log("Player Param: ",req.params);
        const { userID } = req.params;    
        const player = await db.findPlayer(userID);
        if(!player){
            res.status(404).json({newPlayer: true, foundPlayer: false});
        }
        res.status(200).json({newPlayer: false, foundPlayer:true});
    }
    catch(err){
        console.log(err);
    }
    
}

async function addPlayer(req,res) {
    try{
        const data = req.body;

        const newPlayer = {
            player_id: data.playerID,
            username: data.username,
            pokemon_name : data.pokemon_name,
            pokemon_type : data.pokemon_type,
            pokemon_experience : data.pokemon_experience
        }
        await db.addNewPlayer(newPlayer);
        console.log("inserted:", newPlayer);
        res.status(201).json({ message: "Player created successfully", player: newPlayer });
    }
    catch(error){
        console.log(error);
        return res.status(400).json({ error: error });
    }
}

module.exports = {
    findPlayer,
    addPlayer,
}