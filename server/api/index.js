import { Router } from 'express'
import user from './user'

const router = new Router()

router.use('/users', user)

export default router
