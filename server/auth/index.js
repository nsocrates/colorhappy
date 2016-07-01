import { Router } from 'express'
import local from './local'
import configureLocalPassport from './local/passport'
import User from '../api/user/user.model'

configureLocalPassport(User)

const router = new Router()

router.use('/local', local)

export default router
