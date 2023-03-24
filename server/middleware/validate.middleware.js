const { object, string } = require("yup")

let userSchema = object({
   name: string().required(),
   surnname: string().required(),
   email: string().email().matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).required(),
   password: string().required().min(3, 'Must be exactly 5 digits').max(15)
})

module.exports = async (req, res, next) => {
   try {
      const user = await userSchema
         .validate(req.body)
         .catch(err => err)
      if (user.errors) return res.status(400).json({ message: `${user.errors}` })
      next()
   } catch (e) {
      console.log(e)
      return res.status(401).json({ message: "Vaildate error" })
   }
}