const express = require("express");
const cors = require("cors")
const { UserRouter } = require("./routes/UserRouter");
const { connection } = require("./config/db");
const { AuthMiddleWare } = require("./Middleware/AuthMiddleware");
const { EmiRouter } = require("./routes/EMIRouter");

const app = express();
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("OK")
})
app.use("/user", UserRouter)
app.use("/emi",EmiRouter)



app.listen(8080, async () => {
    try {
        await connection;
        console.log("connected to Db!!")
    } catch (error) {
        console.log(error);

    }
    console.log("poet 8080 is running")
})