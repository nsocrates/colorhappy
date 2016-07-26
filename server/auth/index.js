import { Router } from 'express'
import local from './local'
import configureLocalPassport from './local/passport'
import { db } from '../sqldb'
const { User } = db

configureLocalPassport(User)

const router = new Router()

router.use('/local', local)

export default router
