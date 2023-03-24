const express = require("express");
const cors = require("cors")
const config = require("config")
const upload = require('express-fileupload')
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes")
const app = express()
const PORT = process.env.PORT || config.get("serverPort")
const filePathMiddleware = require("./middleware/filePath.middleware")
const path = require("path")

app.use(upload())
app.use(cors())
app.use(filePathMiddleware(path.resolve(__dirname, "files")))
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)

const start = async () => {
   try {

      app.listen(PORT, () => {
         console.log("Server started on port", PORT)
      })
   } catch (e) {

   }
}

start()