import { Router } from 'express'
import * as controller from './user.controller'

const router = new Router()

router.get('/', controller.index)
router.post('/', controller.create)
router.get('/:id', controller.show)
router.get('/:id/palettes', controller.indexPalettes)
router.get('/:id/favorites', controller.indexFavorites)

export default router
