const { sql } = require("./PlayerDB");



async function findUser(username) {
    try{
        const request = new sql.Request();

        const result = await request
            .input("username", sql.VarChar, username)
            .query(`SELECT * FROM UserEntry WHERE username = @username`);


        if (result.recordset.length === 0) {
            console.log("No user found in Database");
            return null;
        }
          
        return result.recordset[0];
    }
    catch(err) {
        console.error('Error querying the database:', err);
        throw err;    
    }
}


async function logInUser(user){
    try{
        const request = new sql.Request();

        const result = await request
            .input("username", sql.VarChar, user.username)
            .input("password", sql.VarChar, user.password)
            .query(`SELECT * FROM UserEntry 
                WHERE username = @username 
                AND password = @password`);

        if (result.recordset.length === 0) {
            console.log("No user found in Database");
            return null;
        }
                
            console.log(`Found user: ${user.username}`);

            return result.recordset[0];
    }
    catch(err){
        console.error('Error querying the database:', err);
        throw err;
    }
}


async function insertUser(user){
    try{
        const request = new sql.Request(); // Use the existing connection

        await request
            .input("username", sql.VarChar, user.username)
            .input("password", sql.VarChar, user.password)
            .input("email", sql.VarChar, user.email)
            .query(`
                INSERT INTO UserEntry (username, password, email) 
                VALUES (@username, @password, @email)
            `);

        console.log(`Inserted user: ${user.username}`);
        
    }
    catch(error){
        throw error;
    }


};

async function findDiscordUser(discordID) {
    try{
        const request = new sql.Request();

        const result = await request
            .input("discordID", sql.VarChar, discordID)
            .query(`SELECT * FROM discordUserEntry WHERE discord_ID = @discordID`);


        if (result.recordset.length === 0) {
            console.log("No user found in Database");
            return null;
        }
    
        console.log("Found Discord User", result.recordset);

        return result.recordset[0];

    }
    catch(err) {
        console.error('Error querying the database:', err);
        throw err;    
    }
}

async function createDiscordUser(discordUser) {
    try{
        const request = new sql.Request();

        const result = await request
            .input("discordID", sql.VarChar, discordUser.discordID)
            .input("discord_username", sql.VarChar, discordUser.username)   
            .query(`INSERT INTO discordUserEntry (discord_ID, discord_username)
                    OUTPUT INSERTED.*
                    VALUES (@discordID, @discord_username) `
                );
            
        console.log(`Inserted Discord User: ${discordUser.username}`);
        console.log(result);
        return result.recordset[0];

    }
    catch(err){
        console.error('Error querying the database:', err);
        throw err;    
    }
}

async function findPlayer(userID){
    try{
        const request = new sql.Request();

        const result = await request
            .input("userID", sql.VarChar, userID)
            .query("SELECT * FROM Player where player_id = @userID");

            if (result.recordset.length === 0) {
                console.log("No Player found in Database");
                return null;
            }
            console.log(`Found Player: ${result.recordset[0].username} with pokemon : ${result.recordset[0].pokemon}`);
            return result.recordset[0];

    }
    catch(err){
        console.error('Error querying the database:', err);
        throw err;    
    }
}

async function addNewPlayer(playerData){

    try{
        console.log("HERE ADD PLAYER")

        const request = new sql.Request();

        const result = await request
            .input("userID", sql.VarChar ,playerData.player_id)
            .input("username", sql.VarChar, playerData.username)
            .input("pokemonName", sql.VarChar, playerData.pokemon_name)
            .input("pokemonType", sql.VarChar, playerData.pokemon_type)
            .input("pokemon_experience", sql.Int, playerData.pokemon_experience)
            .query(`INSERT INTO Player (player_id, username, pokemon_name, pokemon_type, pokemon_experience) 
                    OUTPUT INSERTED.*
                    VALUES (@userID,@username,@pokemonName,@pokemonType,@pokemon_experience)`);
            console.log(`Inserted Player: ${playerData.player_id}`);
            console.log(result);
            return result.recordset[0];
    }
    catch(err){
        console.error('Error querying the database:', err);
        throw err;    
    }
}

module.exports = {
    insertUser,
    findDiscordUser,
    createDiscordUser,
    findUser,
    logInUser,
    findPlayer,
    addNewPlayer,
};