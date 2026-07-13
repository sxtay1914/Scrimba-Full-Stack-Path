import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'

async function viewAllProducts() {
  const db = await open({ 
    filename: path.join('database.db'),
    driver: sqlite3.Database
  });

  try { 
    const products = await db.all('SELECT * FROM products')
    // Neater table display
    const displayItems = products.map(({ id, title, artist, year, stock }) => {
      return { id, title, artist, year, stock }
    })
    console.table(displayItems)
  } catch (err) {
    console.error('Error fetching products:', err.message)
  } finally {
    await db.close()
  }
}

viewAllProducts()