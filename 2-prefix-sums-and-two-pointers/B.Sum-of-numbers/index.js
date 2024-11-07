function getSum(n, k, arr) {
	const prefixArr = [0];
	let count = 0;
  
	for (let i = 0; i < n; i++) {
	  prefixArr.push(prefixArr[i] + arr[i]);
	}
  
	const seenSums = new Set();
  
	for (let sum of prefixArr) {
	  if (seenSums.has(sum - k)) {
		count++;
	  }
	  seenSums.add(sum);
	}
  
	return count;
  }
