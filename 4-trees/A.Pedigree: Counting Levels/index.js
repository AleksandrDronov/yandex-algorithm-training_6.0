function calculateHeight(name, parentMap, heightMap) {
	// Если высота уже вычислена, возвращаем её
	if (heightMap.hasOwnProperty(name)) {
	  return heightMap[name];
	}
  
	// Если имя родоначальника, высота 0
	if (!parentMap.hasOwnProperty(name)) {
	  heightMap[name] = 0;
	  return 0;
	}
  
	// Рекурсивно вычисляем высоту для родителя и добавляем 1
	const parent = parentMap[name];
	const parentHeight = calculateHeight(parent, parentMap, heightMap);
	heightMap[name] = parentHeight + 1;
	return heightMap[name];
  }
  
  function main(n, arr) {
	const parentMap = {}; // Словарь для хранения родителя для каждого потомка
	const heightMap = {}; // Словарь для хранения высоты каждого элемента
  
	// Чтение всех N-1 строк с именами потомков и их родителей
	for (let i = 0; i < n - 1; i++) {
	  const [descendant, parent] = arr[i].split(" ");
	  parentMap[descendant] = parent;
	}
  
	// Для каждого элемента вычисляем его высоту
	const allNames = new Set([
	  ...Object.keys(parentMap),
	  ...Object.values(parentMap),
	]);
  
	// Вычисляем высоты для всех людей
	allNames.forEach((name) => calculateHeight(name, parentMap, heightMap));
  
	// Получаем список всех имен в лексикографическом порядке
	const sortedNames = Object.keys(heightMap).sort();
  
	const res = [];
  
	// Выводим имена и соответствующие им высоты
	sortedNames.forEach((name) => {
	  res.push(name + " " + heightMap[name]);
	});
	
	return res.join("\n")
  }