/* eslint-disable prefer-arrow-callback */

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const Schema = mongoose.Schema
const UserSchema = new Schema({
  role: { type: String, default: 'user' },
  email: { type: String, lowercase: true, unique: true, required: true },
  password_hash: { type: String, required: true },
  profile: {
    first_name: String,
    last_name: String,
    display_name: String,
    gender: String,
    avatar: String,
    birthdate: String,
    bio: String,
    location: String,
  },
}, { timestamps: true })

// Options
// ...

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

/**
 * Hooks
 */

UserSchema.pre('save', function (next) {
  // ...
  return next
})

/**
 * Validations
 */

UserSchema.path('email').validate(function (value) {
  if (!validator.isEmail(value)) {
    this.invalidate('email', "Doesn't look like a vaild email...")
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

/**
 * Methods
 */

UserSchema.methods = {
  // Compare password
  isMatch(password, cb) {
    const isMatch = bcrypt.compareSync(password, this.password_hash)
    if (!cb) return isMatch
    return isMatch ? cb(null, true) : cb(null, false)
  },
}

export default mongoose.model('User', UserSchema)
