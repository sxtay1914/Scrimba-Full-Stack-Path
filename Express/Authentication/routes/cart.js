import express from 'express'
import { 
  addToCart, 
  getCartCount, 
  getAll, 
  deleteItem, 
  deleteAll } from '../controllers/cartController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const cartRouter = express.Router()

cartRouter.post('/add', requireAuth, addToCart) 
cartRouter.get('/cart-count', requireAuth, getCartCount)
cartRouter.get('/', requireAuth, getAll) 
cartRouter.delete('/all', requireAuth, deleteAll) 
cartRouter.delete('/:itemId', requireAuth, deleteItem) 