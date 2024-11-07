function solve(n, a, b, p) {
	const algorithms = [];
  
	for (let i = 0; i < n; i++) {
	  algorithms.push({ interest: a[i], usefulness: b[i], index: i + 1 });
	}
  
	const interestingAlgorithms = [...algorithms].sort((x, y) => {
	  if (y.interest !== x.interest) return y.interest - x.interest;
	  if (y.usefulness !== x.usefulness) return y.usefulness - x.usefulness;
	  return x.index - y.index;
	});
  
	const usefulAlgorithms = [...algorithms].sort((x, y) => {
	  if (y.usefulness !== x.usefulness) return y.usefulness - x.usefulness;
	  if (y.interest !== x.interest) return y.interest - x.interest;
	  return x.index - y.index;
	});
  
	let interestingPointer = 0;
	let usefulPointer = 0;
  
	const studied = new Set();
	const result = [];
  
	for (let mood of p) {
	  let selectedAlgorithm;
  
	  if (mood === 1) {
		while (studied.has(usefulAlgorithms[usefulPointer].index)) {
		  usefulPointer++;
		}
		selectedAlgorithm = usefulAlgorithms[usefulPointer];
		usefulPointer++;
	  } else {
		while (studied.has(interestingAlgorithms[interestingPointer].index)) {
		  interestingPointer++;
		}
		selectedAlgorithm = interestingAlgorithms[interestingPointer];
		interestingPointer++;
	  }
  
	  result.push(selectedAlgorithm.index);
	  studied.add(selectedAlgorithm.index);
	}
  
	return result.join(" ");
  }