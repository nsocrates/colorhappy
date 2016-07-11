import { Router } from 'express'
import * as controller from './user.controller'
import { isAuthenticated } from '../../auth/auth.service'

const router = new Router()

router.post('/', controller.create)
router.get('/me', isAuthenticated(), controller.me)
router.put('/me', isAuthenticated(), controller.updateProfile)
router.put('/me/password', isAuthenticated(), controller.updatePassword)
router.get('/:id', controller.show)
router.get('/:id/palettes', controller.showPalettes)
router.get('/:id/loves', controller.showLoves)

export default router
