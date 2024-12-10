class Node {
	constructor(name) {
	  this.name = name; // Имя человека
	  this.children = []; // Массив детей
	}
  
	// Метод для добавления ребенка
	addChild(child) {
	  this.children.push(child);
	}
  }
  
  const res = {}; // Результат для хранения количества потомков
  
  // Итеративная версия функции обхода дерева
  function traversal(root) {
	const stack = [root]; // Стек для обхода
	const visited = new Set(); // Множество для отслеживания посещенных узлов
	const descendants = new Map(); // Карта для хранения количества потомков для каждого узла
  
	// Строим дерево, пока стек не станет пустым
	while (stack.length > 0) {
	  const currentNode = stack[stack.length - 1]; // Текущий узел (верхушка стека)
  
	  // Если у узла есть дети, и мы их еще не обработали, то добавляем их в стек
	  if (currentNode.children.length > 0 && !visited.has(currentNode.name)) {
		currentNode.children.forEach((child) => {
		  if (!visited.has(child.name)) {
			stack.push(child); // Добавляем ребенка в стек
		  }
		});
		visited.add(currentNode.name); // Отмечаем текущий узел как посещенный
	  } else {
		// Если узел не имеет детей или все его дети уже обработаны
		let count = 0;
  
		// Считаем количество потомков для текущего узла
		currentNode.children.forEach((child) => {
		  count += descendants.get(child.name) + 1; // +1 для самого ребенка
		});
  
		// Сохраняем количество потомков для текущего узла
		descendants.set(currentNode.name, count);
		res[currentNode.name] = count; // Записываем количество потомков для текущего узла
  
		stack.pop(); // Убираем текущий узел из стека
	  }
	}
  }
  
  function main(n, arr) {
	const people = {}; // Объект для хранения людей по имени
	const allPeople = new Set(); // Множество всех людей
	const children = new Set(); // Множество детей
  
	// Чтение N-1 строк и создание дерева
	for (let i = 0; i < n - 1; i++) {
	  const [descendant, parent] = arr[i].split(" ");
  
	  // Создаем или находим существующие узлы
	  if (!people[parent]) {
		people[parent] = new Node(parent);
	  }
	  if (!people[descendant]) {
		people[descendant] = new Node(descendant);
	  }
  
	  // Добавляем потомка в список детей родителя
	  people[parent].addChild(people[descendant]);
  
	  // Добавляем в множества людей и детей
	  allPeople.add(descendant);
	  allPeople.add(parent);
	  children.add(descendant);
	}
  
	// Находим родоначальника (тот, кто не является потомком)
	const root = [...allPeople].find((person) => !children.has(person));
  
	// Запуск итеративного обхода дерева с родоначальника
	traversal(people[root]);
  
	// Сортируем людей по имени
	const sortedPeople = Object.keys(res).sort();
  
	// Выводим результат
	const sortedRes = [];
  
	for (let person of sortedPeople) {
	  sortedRes.push(`${person} ${res[person]}`);
	}
  
	return sortedRes.join("\n");
  }
  