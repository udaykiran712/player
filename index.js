const express = require("express")
const app = express()
const path = require("path")
const {open} = require("sqlite")
const sqlite3 = require("sqlite3")
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const dbPath = path.join(__dirname,"goodreads.db")
let db = null;

const initializeServer = async ()=>{
try{
db = await open({
    filename:dbPath,
    driver:sqlite3.Database
})
app.listen(4000,()=>{
    console.log("Server is present")
})


}
catch(e){
console.log("Db Erroe")
process.exit(1)
}

}

initializeServer()


app.get("/",async (request,response)=>{
    const playersQuery = `SELECT * FROM player`
    const playersArray =await  db.all(playersQuery)
    response.send(playersArray)
})

app.post("/add/player/",async (request,response)=>{
    const playerDetails = request.body
    console.log(request.body)
    const {name,age,score} = playerDetails
    console.log(playerDetails)

    const playersQuery = `
    INSERT INTO player (name,age,score)
    VALUES
    (
    '${name}',
    ${age},
    ${score}
    ) 
    `

    db.run(playersQuery)
    response.send("ADDED SUUCESSFULLY")

})

app.put("/edit/player/",async (request,response)=>{
const details = request.body;
console.log(details)
const {name} = details
console.log(name)

const query = `UPDATE player 
SET score = 100000
WHERE name = '${name}'
`;

db.run(query)
response.send("UPDATED SUCCESSFULLy")
})
