const User = require('../utils/login-schema')

const login = async (req, res) => {
  try {
    const { name, email, password, domain } = req.body

    if (!name || !email || !password || !domain) {
      return res.status(400).json({ message: "Please fill in all required fields." })
    }

    const newUser = await User.create({ name, email, password, domain })
    const token = await newUser.generateToken()

    res.status(201).json({
      message: "Account created successfully 🎉",
      token,
      user: newUser
    })
  } catch {
    res.status(500).json({ message: "Something went wrong. Please try again later." })
  }
}

module.exports = { login }
