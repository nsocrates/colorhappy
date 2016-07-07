import { Router } from 'express'
import user from './user'
import palette from './palette'

const router = new Router()

router.use('/users', user)
router.use('/palettes', palette)

export default router
