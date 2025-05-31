const db = require("../db/PlayerQuery");


async function createUserPost(req,res) {
    const data = req.body;
    try{
        const newUser = {
            username: data.userName,
            password: data.userPassword,
            email: data.userEmail
        }
        await db.insertUser(newUser);
        console.log("inserted:", newUser);
        res.status(201).json({ message: "User created successfully", user: newUser });
    }
    catch(error){
        if (error.number === 2627) { // SQL Server error for UNIQUE constraint violation
            console.error("Error: Unique constraint violation");
            console.log(error);
            return res.status(400).json({ error: error });
        } else {
            console.error("Database error:", error);
            return res.status(500).json({ error: "Internal server error" });
        }

    }
    
    

}

module.exports = {
    createUserPost,
}