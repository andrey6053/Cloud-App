class File {
   constructor(params) {
      this._id = params.id
      this.name = params.name
      this.path = params.path || "disk"
      this.type = params.type
      this.size = params.size
      this.date = new Date().toISOString()
      this.userOwner = params.userOwner
      this.parent = params.parent ? `${params.parent}` : "disk"
   }
}

module.exports = File