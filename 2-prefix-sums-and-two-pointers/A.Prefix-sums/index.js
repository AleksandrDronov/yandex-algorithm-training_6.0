function getPrefixSumm(n, arr) {
	const res = [arr[0]];

	for (let i = 1; i < n; i++) {
		res.push(res[i - 1] + arr[i]);
	}

	return res.join(' ');
}
