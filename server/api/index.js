import { Router } from 'express'
import user from './user'
import palette from './palette'
import me from './me'

const router = new Router()

router.use('/me', me)
router.use('/users', user)
router.use('/palettes', palette)

export default router
