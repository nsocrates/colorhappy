import { Router } from 'express'
import * as controller from './me.controller'
import { isAuthenticated } from '../../auth/auth.service'

const router = new Router

router.get('/', isAuthenticated(), controller.me)
router.put('/', isAuthenticated(), controller.update)
router.get('/palettes', isAuthenticated(), controller.indexPalettes)
router.get('/favorites', isAuthenticated(), controller.indexFavorites)
router.put('/password', isAuthenticated(), controller.updatePassword)

export default router
