function queue(n, b, a) {
	let count = 0;
	let waitingClients = 0;
  
	for (let minute of a) {
	  waitingClients += minute;
	  count += waitingClients;
	  waitingClients -= Math.min(waitingClients, b)
	}
  
	return (count += waitingClients);
  }