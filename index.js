const express = require("express")
const cors = require("cors")
app.use(cors())
const app = express()
const port = 2500;

app.use(express.json())

app.post("/api/data",(request,response)=>{
    const data = request.body
    console.log("RECEIVED DATA:",data)
    response.send({message:data})
});

app.listen(port,()=>{
    console.log("SERVER is listenting at 2500")
})