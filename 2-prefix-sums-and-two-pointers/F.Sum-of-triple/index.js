function calculateSumOfTriplets(n, arr) {
	const MOD = 1000000007;
	let totalSum = 0;
	let sumAll = 0;
	let sumPairs = 0;

	for (let k = n - 1; k >= 0; k--) {
		totalSum = (totalSum + arr[k] * sumPairs) % MOD;
		sumPairs = (sumPairs + arr[k] * sumAll) % MOD;
		sumAll = (sumAll + arr[k]) % MOD;
	}

	return totalSum;
}
