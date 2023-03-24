const Pool = require("pg").Pool
const client = new Pool({
   host: "localhost",
   port: "5050",
   user: "postgres",
   password: "12345",
   database: "Cloud-disk"
})

class SqlService {
   findUserByEmail(email) {
      const query = `
      SELECT * from users
      WHERE email='${email}';`
      return new Promise(((resolve, reject) => {
         try {
            client.query(query, (err, res) => {
               if (err) throw err
               return resolve(res.rows)
            })
         } catch (e) {
            return reject({ message: "SqlService error, find user by email process" })
         }
      }))
   }
   findUserById(userId) {
      const query = `
      SELECT * from users
      WHERE _id=${userId};`
      return new Promise(((resolve, reject) => {
         try {
            client.query(query, (err, res) => {
               if (err) throw err
               return resolve(res.rows)
            })
         } catch (e) {
            return reject({ message: "SqlService error, find user by id process" })
         }
      }))
   }
   async findFile(userId, fileId = null) {
      const query = `
      SELECT * FROM files
      WHERE userowner=${userId} AND _id='${fileId}';`
      return new Promise(((resolve, reject) => {
         try {
            client.query(query, (err, res) => {
               if (err) throw err
               return resolve(res.rows)
            })
         } catch (e) {
            return reject({ message: "SqlService error, findFile process" })
         }
      }))
   }
   async getFiles(userId, parentId = null, isSearch = false) {
      const query = `
      SELECT * FROM files
      WHERE userowner=${userId} ${isSearch ? "" : `${parentId ? `AND parent = '${parentId}'` : "AND parent = 'disk'"}`}; `
      return new Promise(((resolve, reject) => {
         try {
            client.query(query, (err, res) => {
               if (err) throw err
               return resolve(res.rows)
            })
         } catch (e) {
            return reject({ message: "SqlService error, getFiles process" })
         }
      }))
   }
   async insertUser(user) {
      const { name, surnname, email, password, diskSpace } = user
      const query = `
      INSERT INTO users
   (name, surname, email, password, diskSpace)
VALUES
   ('${name}', '${surnname}', '${email}', '${password}', ${diskSpace}); `
      return new Promise(((resolve, reject) => {
         try {
            client.query(query, (err, res) => {
               if (err) throw err
               return resolve(res.rows)
            })
         } catch (e) {
            return reject({ message: "SqlService error, insertUser process" })
         }
      }))
   }
   async updateFile(fileId, column, field) {
      const query = `
      UPDATE files
	   SET ${column}=${field}
      WHERE _id = '${fileId}'; `
      return new Promise(((resolve, reject) => {
         try {
            client.query(query, (err, res) => {
               if (err) throw err
               return resolve(res.rows)
            })
         } catch (e) {
            return reject({ message: "SqlService error, updateFile process" })
         }
      }))
   }
   async updateUsers(fileId, column, field) {
      const query = `
      UPDATE users
	   SET ${column}=${field}
      WHERE _id = ${fileId}; `
      return new Promise(((resolve, reject) => {
         try {
            client.query(query, (err, res) => {
               if (err) throw err
               return resolve(res.rows)
            })
         } catch (e) {
            return reject({ message: "SqlService error, updateFile process" })
         }
      }))
   }
   async insertFile(file) {
      const { _id, name, size, type, path, parent, userOwner, date } = file
      const query = `
      INSERT INTO files
      (_id,name, type, date, path, size, parent, userOwner)
      VALUES
   ('${_id}','${name}', '${type}', '${date}', '${path}', ${size}, '${parent}', ${userOwner}); `
      return new Promise(((resolve, reject) => {
         try {
            client.query(query, (err, res) => {
               if (err) throw err
               return resolve(res.rows)
            })
         } catch (e) {
            return reject({ message: "SqlService error, insertFile process" })
         }
      }))
   }
   async deleteFile(fileId) {
      const query = `
      DELETE FROM files 
      WHERE _id = '${fileId}';
      DELETE FROM files 
      WHERE parent = '${fileId}';`
      return new Promise(((resolve, reject) => {
         try {
            client.query(query, (err, res) => {
               if (err) throw err
               return resolve(res.rows)
            })
         } catch (e) {
            return reject({ message: "SqlService error, deleteFile process" })
         }
      }))
   }
}

module.exports = new SqlService()