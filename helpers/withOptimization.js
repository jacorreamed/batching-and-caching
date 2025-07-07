const queryTotalSales = require('../libraries/queryTotalSales');
const createOptimizedWrapper = require('./createOptimizedWrapper');

module.exports = createOptimizedWrapper(queryTotalSales, { ttl: 30 * 1000 });
