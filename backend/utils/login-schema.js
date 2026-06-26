const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    domain: {
      type: String,
      required: true,
      enum: ['frontend', 'backend', 'fullstack', 'devops', 'other'],
      default: 'other'
    }
  },
  { timestamps: true }
)

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      { userId: this._id, email: this.email },
      process.env.JWT_SECRET
    )
  } catch (error) {
    return null
  }
}

const User = mongoose.model('User', userSchema)
module.exports = User
