class User {
   constructor(params) {
      this.name = params.name
      this.surnname = params.surnname
      this.email = params.email
      this.password = params.password
      this.diskSpace = 1024 ** 3 * 10
      this.usedSpace = 0
   }
}

module.exports = User