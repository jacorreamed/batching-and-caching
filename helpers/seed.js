const dbConnection = require('../database/dbConnection');

const PRODUCTS = ['book', 'laptop', 'desk', 'folder'];

const getRandomAmount = () => Math.floor(Math.random() * 491) + 10; // entre 10 y 500

const seed = async () => {
  const db = await dbConnection;

  // Crear tabla si no existe
  await db.exec(`
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product TEXT NOT NULL,
      amount INTEGER NOT NULL
    );
  `);

  const insertStmt = await db.prepare('INSERT INTO sales (product, amount) VALUES (?, ?)');

  for (const product of PRODUCTS) {
    for (let i = 0; i < 1000; i++) {
      await insertStmt.run(product, getRandomAmount());
    }
    console.log(`✔ Insertados 1000 registros de ${product}`);
  }

  await insertStmt.finalize();
  console.log('✅ Base de datos poblada correctamente.');
};

seed();
