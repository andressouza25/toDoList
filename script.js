const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const tasksContainer = document.querySelector(".tasks-container");

// Vai validar se o valor do input está vazio

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  // Inicialmente vai verificar se o input é valido

  const inputIsValid = validateInput();

  console.log(inputIsValid);
  // Se ele for inválido, vamos setar uma classe de erro

  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }
  // Criando a DIV,paragrafo e o icon do delete nos itens da lista

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  // Setando o valor do input no paragrafo
  taskContent.innerText = inputElement.value;

  // Marcar como tarefa realizada
  taskContent.addEventListener("click", () => handleClick(taskContent));
  // font awesome sendo utilizado

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("far");
  deleteItem.classList.add("fa-trash-alt");
  deleteItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskContent)
  ); // Deletar o item

  taskItemContainer.appendChild(taskContent); // Setando a DIV como pai do paragrafo
  taskItemContainer.appendChild(deleteItem); // Setando a DIV como pai do icon
  tasksContainer.appendChild(taskItemContainer); // Setando a DIV dentro da DIV pai

  inputElement.value = "";
  updateLocalStorage();
};

const handleClick = (taskContent) => {
  const tasks = tasksContainer.childNodes;
  for (const task of tasks) {
    // Criando uma variavel que vai dizer se a tarefa clica é a mesma pesquisa
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

    // Se for TRUE, vai setar a classe completed
    // Se já estiver setado, ela será removida
    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }
  updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes;
  for (const task of tasks) {
    // Criando uma variavel que vai dizer se a tarefa clica é a mesma pesquisa
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
    if (currentTaskIsBeingClicked) {
      // Se for TRUE, vamos deletar o item
      taskItemContainer.remove();
    }
  }
  updateLocalStorage();
};

// "Escuta" o change do input, se for alterado, ele vai remover a classe erro
const handleInputChange = () => {
  const inputIsValid = validateInput();
  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

// Função para att o Local Sorage
const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes;
  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  for (const task of tasksFromLocalStorage) {
    // Criando a DIV,paragrafo e o icon do delete nos itens da lista
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");
    const taskContent = document.createElement("p");
    taskContent.innerText = task.description; // Setando o valor do input no paragrafo

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }
    taskContent.addEventListener("click", () => handleClick(taskContent)); // Marcar como tarefa realizada
    // font awesome sendo utilizado
    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");
    deleteItem.addEventListener("click", () =>
      handleDeleteClick(taskItemContainer, taskContent)
    ); // Deletar o item
    taskItemContainer.appendChild(taskContent); // Setando a DIV como pai do paragrafo
    taskItemContainer.appendChild(deleteItem); // Setando a DIV como pai do icon
    tasksContainer.appendChild(taskItemContainer); // Setando a DIV dentro da DIV pai
  }
};
refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());
inputElement.addEventListener("change", () => handleInputChange());
