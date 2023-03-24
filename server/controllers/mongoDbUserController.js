   //async registrationUser(req, res) {
   //   try {

   //      const { name, surnname, email, password } = req.body
   //      const candidate = await User.findOne({ email })
   //      if (candidate) {
   //         return res.status(400).json({ message: `User with email ${email} already exist` })
   //      }
   //      const hashPassword = await bcrypt.hash(password, 8)
   //      const user = new User({ name, surnname, email, password: hashPassword })
   //      await user.save()
   //      const filePath = __dirname.replace("\\controllers", "\\files")
   //      req.filePath = filePath
   //      await fileService.createDir(new File({ user: user.id, name: "" }), req)
   //      return res.json({ message: "User was created" })
   //   } catch (e) {
   //      console.log(e)
   //      return res.status(400).json({ message: "Server error" })
   //   }
   //}
   //async loginUser(req, res) {
   //   try {
   //      const { email, password } = req.body
   //      const user = await User.findOne({ email })
   //      if (!user) {
   //         return res.status(404).json({ message: "User not found" })
   //      }
   //      const isPassValid = bcrypt.compareSync(password, user.password)
   //      if (!isPassValid) {
   //         return res.status(400).json({ message: "Invalid password" })
   //      }
   //      const scrtKey = config.get("secretKey")
   //      const token = jwt.sign({ id: user.id }, scrtKey, { expiresIn: "1h" })
   //      return res.json({
   //         message: "Успешный вход",
   //         token,
   //         user: {
   //            id: user.id,
   //            email: user.email,
   //            diskSpace: user.diskSpace,
   //            usedSpace: user.usedSpace,
   //            avatar: user.avatar
   //         }
   //      })
   //   } catch (e) {
   //      console.log(e)
   //      return res.status(500).json({ message: "Server error" })
   //   }
   //}
   //async authUser(req, res) {
   //   try {
   //      const user = await User.findOne({ _id: req.user.id })
   //      const scrtKey = config.get("secretKey")
   //      const token = jwt.sign({ id: user.id }, scrtKey, { expiresIn: "1h" })
   //      return res.json({
   //         message: "Успешный вход",
   //         token,
   //         user: {
   //            id: user.id,
   //            email: user.email,
   //            diskSpace: user.diskSpace,
   //            usedSpace: user.usedSpace,
   //            avatar: user.avatar
   //         }
   //      })
   //   } catch (e) {
   //      console.log(e)
   //      return res.status(500).json({ message: "Server error" })
   //   }
   //}