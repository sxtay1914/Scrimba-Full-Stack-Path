import { getDBConnection } from './db/db.js'

async function logTable() {
  const db = await getDBConnection()

  const tableName = 'cart_items'
  // const tableName = 'products'
  // const tableName = 'users'

  try {
    const table = await db.all(`SELECT * FROM ${tableName}`)
    console.table(table)

  } catch (err) {

    console.error('Error fetching table:', err.message)

  } finally {

    await db.close()

  }
}

logTable()