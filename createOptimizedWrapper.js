module.exports = function createOptimizedWrapper(queryFunction, options = {}) {
  const CACHE_TTL = options.ttl || 30 * 1000; // default TTL: 30s

  const cache = new Map(); // key => { value, expiresAt }
  const pendingRequests = new Map(); // key => Promise

  return async function wrappedQuery(key) {
    const now = Date.now();

    // 1. Check cache
    const cached = cache.get(key);
    if (cached && cached.expiresAt > now) {
      console.log('Cache hit');
      return cached.value;
    }

    // 2. Check pending requests
    if (pendingRequests.has(key)) {
      console.log('Batching request');
      return pendingRequests.get(key);
    }

    // 3. Perform real query
    const promise = queryFunction(key).then(result => {
      cache.set(key, {
        value: result,
        expiresAt: now + CACHE_TTL
      });
      return result;
    }).finally(() => {
      pendingRequests.delete(key);
    });

    pendingRequests.set(key, promise);
    return promise;
  };
};


