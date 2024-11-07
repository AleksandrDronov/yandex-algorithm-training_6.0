function delMedian(n, arr) {
	const sortedArr = arr.sort((a, b) => a - b);

	let pivotIndex;

	if (n % 2 === 0) {
		pivotIndex = Math.floor((n - 1) / 2);
	} else {
		pivotIndex = (n - 1) / 2;
	}

	let i = n - 1;
	let left = pivotIndex - 1;
	let right = pivotIndex + 1;

	const res = [sortedArr[pivotIndex]];

	while (i > 0) {
		if (i % 2 === 0) {
			res.push(sortedArr[left]);
			left--;
		} else {
			res.push(sortedArr[right]);
			right++;
		}
		i--;
	}

	return res.join(" ");
}
