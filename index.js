const http = require('http');

const mode = process.argv[2];
const useOptimized = mode === 'optimized';

// load function with/without optimization
const getTotalSales = useOptimized
  ? require('./createOptimizedWrapper')
  : require('./queryTotalSales');

console.log(`Using ${useOptimized ? 'optimized' : 'non-optimized'} version`);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/total-sales') {
    const product = url.searchParams.get('product') || 'book';
    try {
      const total = await getTotalSales(product);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ product, total }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
