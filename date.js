const express = require("express")


const app = express();

app.get("/date",(request,response)=>{
    let todayDate = new Date()
    response.send(`Todays Date is ${todayDate}`)
    

})


app.listen(3000)