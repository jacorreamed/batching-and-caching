## How to Run the Project and Benchmark It

### 1. Clone the repository locally.

### 2. Run ```npm install``` to install dependencies.

### 3. Install Autocannon globally to run load tests later: ```npm i -g autocannon```

### 4. Navigate to the helpers folder: ```cd helpers```

### 5. Populate the database by running: ```node seed.js```

### 6. Go back to the project root: ```cd ..```

### 7. To test the API with and without optimization:
  -  Without optimization: ```node index.js```
  -  With optimization: ```node index.js optimized```

### 8. Open the following URL in your browser to verify the app is running correctly:
```http://localhost:8000/total-sales?product=book```

### 9. Run the load test using Autocannon:
```autocannon -d 10 -c 100 "http://localhost:8000/total-sales?product=book"```

### 10. Compare the performance results with and without optimization.
