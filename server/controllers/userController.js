const User = require("../models/User")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const File = require("../models/File")
const fileService = require("../services/fileService")
const sqlService = require('../services/sqlServices')
const { v4: uuidv4 } = require('uuid');

class UserController {
   async registrationUser(req, res) {
      try {
         const { name, surnname, email, password } = req.body
         const candidate = await sqlService.findUserByEmail(email)
         if (candidate.length !== 0) {
            return res.status(400).json({ message: `User with email ${email} already exist` })
         }
         const hashPassword = await bcrypt.hash(password, 8)
         const user = new User({ name, surnname, email, password: hashPassword })
         await sqlService.insertUser(user)
         const findUser = await sqlService.findUserByEmail(email)
         const userId = findUser[0]._id
         const filePath = __dirname.replace("\\controllers", "\\files")
         req.filePath = filePath
         await fileService.createDir(new File({ id: uuidv4(), userOwner: userId, path: "disk", name: "", type: "dir", size: 0 }), req)
         return res.json({ message: "User was created" })
      } catch (e) {
         console.log(e)
         return res.status(400).json({ message: "Server error" })
      }
   }
   async loginUser(req, res) {
      try {
         const { email, password } = req.body
         const select = await sqlService.findUserByEmail(email)
         if (select.length === 0) {
            return res.status(404).json({ message: "User not found" })
         }
         const user = Object.assign({}, select[0])
         const isPassValid = bcrypt.compareSync(password, user.password)
         if (!isPassValid) {
            return res.status(400).json({ message: "Invalid password" })
         }
         const scrtKey = config.get("secretKey")
         const token = jwt.sign({ id: user._id }, scrtKey, { expiresIn: "1h" })
         return res.json({
            message: "Успешный вход",
            token,
            user: {
               id: user._id,
               email: user.email,
               diskSpace: user.diskSpace,
               usedSpace: user.usedSpace
            }
         })
      } catch (e) {
         console.log(e)
         return res.status(500).json({ message: "Server error" })
      }
   }
   async authUser(req, res) {
      try {
         const select = await sqlService.findUserById(req.user.id)
         const user = Object.assign({}, select[0])
         const scrtKey = config.get("secretKey")
         const token = jwt.sign({ id: user._id }, scrtKey, { expiresIn: "1h" })
         return res.json({
            message: "Успешный вход",
            token,
            user: {
               id: user._id,
               email: user.email,
               diskSpace: user.diskSpace,
               usedSpace: user.usedSpace
            }
         })
      } catch (e) {
         console.log(e)
         return res.status(500).json({ message: "Server error" })
      }
   }
}

module.exports = new UserController()