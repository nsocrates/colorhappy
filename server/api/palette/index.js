import { Router } from 'express'
import * as controller from './palette.controller'
import { isAuthenticated } from '../../auth/auth.service'

const router = new Router()

router.get('/', controller.index)
router.post('/', isAuthenticated(), controller.create)
router.get('/:id', controller.show)
router.put('/:id', isAuthenticated(), controller.update)
router.delete('/:id', isAuthenticated(), controller.destroy)
router.put('/:id/love', isAuthenticated(), controller.love)
router.delete('/:id/love', isAuthenticated(), controller.unlove)

export default router
