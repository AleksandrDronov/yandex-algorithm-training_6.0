function getCount(n, k, arr) {
	const sortedArr = arr.sort((a, b) => a - b);

	let i = 0;
	let j = 1;
	let days = 1;

	while (j < n) {
		while (sortedArr[j] - sortedArr[i] <= k) {
			days++
			++j;
		}
		++i;
		++j;
	}

	return days;
}
