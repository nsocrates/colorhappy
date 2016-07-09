/**
 * Populate DB with sample data on server start
 */

import mongo from 'mongodb'
import User from '../api/user/user.model'
import Palette from '../api/palette/palette.model'
import bcrypt from 'bcrypt'
const objectId = mongo.ObjectID

Palette.find({}).remove()
  .then(() => {
    Palette.create({
      _id: objectId('6a3cf4730e9f5802ef500001'),
      title: 'Lambs on Doors',
      description: 'From COLOURlovers',
      colors: ['DD002C', 'DD8395', 'DDC9A7', '958871', '533817'],
      viewCount: '0',
      loveCount: '0',
      loves: [objectId('503cf4730e9f580200000003')],
      userId: objectId('503cf4730e9f580200000002'),
      user: objectId('503cf4730e9f580200000002'),
      createdAt: '2016-07-08T23:16:24.639Z',
    }, {
      _id: objectId('6a3cf4730e9f5802ef500002'),
      title: 'Caroline Matilda',
      description: 'From COLOURlovers',
      colors: ['5B503E', 'A19472', 'C8C0AD', 'C29379', '7A97A5'],
      viewCount: '0',
      loveCount: '0',
      loves: [objectId('503cf4730e9f580200000003')],
      userId: objectId('503cf4730e9f580200000002'),
      user: objectId('503cf4730e9f580200000002'),
      createdAt: '2016-07-08T23:16:23.639Z',
    }, {
      _id: objectId('6a3cf4730e9f5802ef500003'),
      title: 'i demand a pancake',
      description: 'From COLOURlovers',
      colors: ['594F4F', '547980', '45ADA8', '9DE0AD', 'E5FCC2'],
      viewCount: '0',
      loveCount: '0',
      loves: [objectId('503cf4730e9f580200000003')],
      userId: objectId('503cf4730e9f580200000002'),
      user: objectId('503cf4730e9f580200000002'),
      createdAt: '2016-07-08T23:16:22.639Z',
    }, {
      _id: objectId('6a3cf4730e9f5802ef500004'),
      title: 'Giant Goldfish',
      description: 'From COLOURlovers',
      colors: ['69D2E7', 'A7DBD8', 'E0E4CC', 'F38630', 'FA6900'],
      viewCount: '0',
      loveCount: '0',
      userId: objectId('503cf4730e9f580200000002'),
      user: objectId('503cf4730e9f580200000002'),
      createdAt: '2016-07-08T23:16:21.639Z',
    }, {
      _id: objectId('6a3cf4730e9f5802ef500005'),
      title: 'let them eat cake',
      description: 'From COLOURlovers',
      colors: ['774F38', 'E08E79', 'F1D4AF', 'ECE5CE', 'C5E0DC'],
      viewCount: '0',
      loveCount: '0',
      userId: objectId('503cf4730e9f580200000002'),
      user: objectId('503cf4730e9f580200000002'),
      createdAt: '2016-07-08T23:16:20.639Z',
    }, {
      _id: objectId('6a3cf4730e9f5802ef500006'),
      title: 'vintage card',
      description: 'From Adobe Kuler',
      colors: ['5C4B51', '8CBEB2', 'F2EBBF', 'F3B562', 'F06060'],
      viewCount: '0',
      loveCount: '0',
      userId: objectId('503cf4730e9f580200000003'),
      user: objectId('503cf4730e9f580200000003'),
      createdAt: '2016-07-08T23:16:19.639Z',
    })
  })

User.find({}).remove()
  .then(() => {
    User.create({
      _id: objectId('503cf4730e9f580200000002'),
      role: 'user',
      username: 'seed',
      email: 'me@me.com',
      password_hash: bcrypt.hashSync('123', 12),
    }, {
      _id: objectId('503cf4730e9f580200000003'),
      role: 'user',
      username: 'seed2',
      email: 'q@q.com',
      password_hash: bcrypt.hashSync('123', 12),
    })
  })
