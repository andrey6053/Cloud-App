const fs = require("fs")

class FileService {
   createDir(file, req) {
      const filePath = `${req.filePath}\\${file.userOwner}\\${file.path}`
      const userPath = `${req.filePath}\\${file.userOwner}`
      return new Promise(((resolve, reject) => {
         try {
            if (!fs.existsSync(userPath)) {
               fs.mkdirSync(userPath)
            }
            if (!fs.existsSync(filePath)) {
               fs.mkdirSync(filePath)
               return resolve({ message: "File was created" })
            } else {
               return reject({ message: "File already exist" })
            }
         } catch (e) {
            console.log(e)
            return reject({ message: "FileService error, create dir process" })
         }
      }))
   }
}

module.exports = new FileService()