/**
 * Populate DB with sample data on server start
 */

import mongo from 'mongodb'
import User from '../api/user/user.model'
import bcrypt from 'bcrypt'
const objectId = mongo.ObjectID

User.find({}).remove()
  .then(() => {
    User.create({
      _id: objectId('503cf4730e9f580200000002'),
      created_at: Date.now(),
      role: 'user',
      email: 'me@me.com',
      password_hash: bcrypt.hashSync('123', 12),
      message_count: 0,
      profile: {
        first_name: 'test',
        last_name: 'user',
        display_name: 'Test User',
        gender: 'Unspecified',
        bio: 'I am a test user',
        location: 'seed.js',
      },
    }, {
      _id: objectId('503cf4730e9f580200000003'),
      created_at: Date.now(),
      role: 'user',
      email: 'q@q.com',
      password_hash: bcrypt.hashSync('123', 12),
      message_count: 0,
      profile: {
        first_name: 'another',
        last_name: 'user',
        display_name: 'Another User',
        gender: 'Unspecified',
        bio: 'This is another user',
        location: 'seed.js',
      },
    })
  })
