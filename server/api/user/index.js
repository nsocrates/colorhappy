import { Router } from 'express'
import controller from './user.controller'
import { isAuthenticated } from '../../auth/auth.service'

const router = new Router()

router.post('/', controller.create)
router.get('/me', isAuthenticated(), controller.me)
router.put('/me', isAuthenticated(), controller.update)
router.get('/search', controller.find)
router.get('/:id', controller.show)

export default router
