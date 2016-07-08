/* eslint-disable prefer-arrow-callback */

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const Schema = mongoose.Schema
const UserSchema = new Schema({
  role: { type: String, default: 'user' },
  username: { type: String, lowercase: true, unique: true, required: true },
  email: { type: String, lowercase: true, unique: true, required: true },
  password_hash: { type: String, required: true, select: false },
  paletteCount: { type: Number, default: 0 },
  loveCount: { type: Number, default: 0 },
}, { timestamps: true })

/**
 * Virtuals
 */

// Encrypt password
UserSchema.virtual('password')
  .get(function () {
    return this._password
  })
  .set(function (value) {
    this._password = value
    this.password_hash = bcrypt.hashSync(value, 12)
  })

UserSchema.set('toJSON', {
  virtuals: true,
})

/**
 * Validations
 */

UserSchema.path('email').validate(function (value) {
  if (!validator.isEmail(value)) {
    this.invalidate('email', "Doesn't look like a vaild email...")
  }
}, null)

UserSchema.path('username').validate(function (value) {
  if (!value.trim()) {
    this.invalidate('username', 'Username is required')
  } else if (!validator.isLength(value, { min: 3 })) {
    this.invalidate('username', 'Username must contain at least 3 characters')
  } else if (!validator.isAlphanumeric(value, 'en-US')) {
    this.invalidate('username', 'Special characters are not allowed')
  }
}, null)

UserSchema.path('password_hash').validate(function () {
  if (this._password) {
    if (!validator.isLength(this._password, { min: 3 })) {
      this.invalidate('password', 'Password must contain at least 3 characters')
    } else if (this.isNew && !this._password) {
      this.invalidate('password', 'Password is required')
    }
  }
}, null)

// Check if email already exists
UserSchema.path('email').validate(function (value, res) {
  this.constructor.findOne({ email: value }, (err, user) => {
    if (err) return res(err)
    if (user && this.id !== user.id) return res(false)
    return res(true)
  })
}, 'User already exist with that email')

// Check if username is taken
UserSchema.path('username').validate(function (value, res) {
  this.constructor.findOne({ username: value }, (err, user) => {
    if (err) return res(err)
    if (user && this.id !== user.id) return res(false)
    return res(true)
  })
}, 'Username has been taken')

/**
 * Methods
 */

UserSchema.methods = {
  // Compare password
  isMatch(password, cb) {
    const isMatch = bcrypt.compareSync(password, this.password_hash)
    if (cb) {
      return isMatch ? cb(null, true) : cb({ message: 'Incorrect password' }, false)
    }

    return new Promise((resolve, reject) => (
      isMatch ? resolve(true) : reject({ message: 'Incorrect password' }))
    )
  },
}

UserSchema.statics = {
  // Allows user to login with either username or email
  findCriteria(username, cb) {
    const criteria = validator.isEmail(username) ? { email: username } : { username }
    return this.findOne(criteria, '+password_hash').exec(cb)
  },
}

export default mongoose.model('User', UserSchema)
