function getCount(n, k, arr) {
	let j = 0;
	let count = 0;

	for (let i = 0; i < n; i++) {
		while (arr[j] - arr[i] <= k && j < n) {
			j++;
		}

		count += n - j;
	}

	return count;
}