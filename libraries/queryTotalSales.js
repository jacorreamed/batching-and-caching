const dbPromise = require('../database/dbConnection');

module.exports = async function getTotalSales(product) {
  const db = await dbPromise;
  const result = await db.get(
    'SELECT SUM(amount) as total FROM sales WHERE product = ?',
    product
  );
  return result.total || 0;
}