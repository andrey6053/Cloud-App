const File = require("../models/File")
const fileService = require("../services/fileService")
const fs = require("fs")
const sqlService = require('../services/sqlServices')
const { v4: uuidv4 } = require('uuid');

class FileController {
   async createDir(req, res) {
      try {
         const { name, type, parent } = req.body
         const id = uuidv4()
         const file = new File({ id, name, type, parent, userOwner: req.user.id, size: 0 })
         const selectParent = await sqlService.findFile(req.user.id, parent)
         const parentFile = selectParent[0]
         if (selectParent.length === 0) {
            file.path = `disk\\${file.name}`
            await fileService.createDir(file, req)
         } else {
            file.path = `${parentFile.path}\\${file.name}`
            await fileService.createDir(file, req)
         }
         await sqlService.insertFile(file)
         return res.json(file)
      } catch (e) {
         console.log(e)
         return res.status(400).json({ message: e })
      }
   }
   async getFiles(req, res) {
      try {
         if (req.query.search) {
            const select = await sqlService.getFiles(req.user.id, null, true)
            const files = select.filter(file => file.name.includes(req.query.search))
            return res.json(files)
         }
         const files = await sqlService.getFiles(req.user.id, req.query.parent)
         return res.json(files)
      } catch (e) {
         console.log(e)
         return res.status(500).json({ message: "Files not found" })
      }
   }
   async uploadFiles(req, res) {
      try {
         const file = req.files.file
         file.name = decodeURI(req.body.name)
         const id = uuidv4()
         const selectParent = await sqlService.findFile(req.user.id, req.body.parent)
         const selectUser = await sqlService.findUserById(req.user.id)
         const parent = selectParent[0]
         const user = selectUser[0]
         let path
         if (user.usedspace + file.size > user.diskspace) {
            console.log(e)
            return res.status(500).json({ message: "Not enough memory on disk" })
         }
         if (parent) {
            path = `${req.filePath}\\${user._id}\\${parent.path}\\${file.name}`
            await sqlService.updateFile(parent._id, "size", `size+${file.size}`)
         } else {
            path = `${req.filePath}\\${user._id}\\disk\\${file.name}`
         }
         if (fs.existsSync(path)) {
            return res.status(500).json({ message: "File already exist" })
         }
         file.mv(path)
         const type = file.name.split(".").pop()
         const dbFile = new File({
            id,
            name: file.name,
            type,
            size: file.size,
            path: parent?.path,
            parent: parent ? parent._id : null,
            userOwner: user._id
         })
         await sqlService.updateUsers(user._id, "usedspace", `usedspace+${file.size}`)
         await sqlService.insertFile(dbFile)
         res.json(dbFile)

      } catch (e) {
         console.log(e)
         return res.status(500).json({ message: "File upload error" })
      }
   }

   async downloadFile(req, res) {
      try {
         const selectFile = await sqlService.findFile(req.user.id, req.query.id)
         const file = selectFile[0]
         let filePath = `${req.filePath}\\${file.userowner}\\${file.name}`
         if (file.path !== "undefined") filePath = `${req.filePath}\\${file.userowner}\\${file.path}\\${file.name}`
         if (fs.existsSync(filePath)) {
            return res.download(filePath, file.name)
         }
         return res.status(500).json({ message: "File not exist" })
      } catch (e) {
         console.log(e)
         return res.status(500).json({ message: "File download error" })
      }
   }

   async deleteFile(req, res) {
      try {
         const selectFile = await sqlService.findFile(req.user.id, req.query.id)
         const selectUser = await sqlService.findUserById(req.user.id)
         const selectParent = await sqlService.findFile(req.user.id, req.query.parent)
         const parent = selectParent[0]
         const file = selectFile[0]
         const user = selectUser[0]
         let filePath
         const id = file._id
         if (file.type !== "dir") {
            filePath = `${req.filePath}\\${file.userowner}\\${file.name}`
            if (file.path !== "undefined") filePath = `${req.filePath}\\${file.userowner}\\${file.path}\\${file.name}`
            fs.unlinkSync(filePath)
            user.usedspace = user.usedspace - file.size
            await sqlService.deleteFile(file._id)
            await sqlService.updateUsers(user._id, "usedspace", `usedspace-${file.size}`)
            if (parent) {
               await sqlService.updateFile(parent._id, "size", `size-${file.size}`)
            }
            return res.json(id)
         }
         filePath = `${req.filePath}\\${file.userowner}\\${file.path}`
         fs.rmSync(filePath, { recursive: true, force: true });
         user.usedspace = user.usedspace - file.size
         await sqlService.deleteFile(file._id)
         if (parent) await sqlService.updateFile(parent._id, "size", `size-${file.size}`)
         await sqlService.updateUsers(user._id, "usedspace", `usedspace-${file.size}`)
         return res.json(id)
      } catch (e) {
         console.log(e)
         return res.status(500).json({ message: "File delete error" })
      }
   }
}

module.exports = new FileController()