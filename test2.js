function fibonacci(n) {
    if (n <= 0) {
      return [];
    } else if (n === 1) {
      return [0];
    } else if (n === 2) {
      return [0, 1];
    } else {
      const fibSeries = [0, 1];
      for (let i = 2; i < n; i++) {
        const nextFib = fibSeries[i - 1] + fibSeries[i - 2];
        fibSeries.push(nextFib);
      }
      return fibSeries;
    }
  }
  
  // Print the first 10 Fibonacci numbers
  const n = 1000;
  const fibonacciSeries = fibonacci(n);
  console.log(`First ${n} Fibonacci numbers: ${fibonacciSeries.join(', ')}`);
  