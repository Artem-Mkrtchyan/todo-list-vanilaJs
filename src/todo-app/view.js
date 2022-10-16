let arrDone = [];

//Создание элемента с заголовком
function createAppTitle(title) {
  let appTitle = document.createElement('h2');
  appTitle.textContent = title;
  return appTitle;
};

//Создание формы и кнопки добавления
function createTodoItemForm() {
  let form = document.createElement('form');
  let input = document.createElement('input');
  let bottonWrapper =  document.createElement('div');
  let button = document.createElement('button');

  button.disabled = true;

  input.addEventListener('input', () => {
    if (input.value !== '') {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  })

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите список ваших дел';
  bottonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = ('Добавить новое дело!');

  bottonWrapper.append(button);
  form.append(input);
  form.append(bottonWrapper);

  return {
    form,
    input,
    button,
  }
};

//Создание списка дел
function createTodoList() {
  let Todolist = document.createElement('ul');
  Todolist.classList.add('list-group');
  return Todolist;
};

//Создание дел
function createTodoItem(obj, { onDone, onDelete }) {
  let item = document.createElement('li');

  //Создание элементов в li
  let itemText = document.createElement('span');
  let buttonGroup = document.createElement('div');
  let doneBtn = document.createElement('button');
  let deleteBtn = document.createElement('button');

  //Стилизация li
  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  if(obj.done) {
    item.classList.add('list-group-item-success');
  }

  itemText.textContent = obj.name;


  //Стилизация кнопок
  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneBtn.classList.add('btn', 'btn-success');
  doneBtn.textContent = 'Done';
  deleteBtn.classList.add('btn', 'btn-danger');
  deleteBtn.textContent = 'Delete';


  //действие по кнопкам
  doneBtn.addEventListener('click', () => {
    onDone({ arr: arrDone, obj, element: item });
    item.classList.toggle('list-group-item-success', obj.done);
  });

  deleteBtn.addEventListener('click', () => {
    onDelete( { arr: arrDone, obj, element: item } );
  })

  //Добавление объектов в li
  buttonGroup.append(doneBtn);
  buttonGroup.append(deleteBtn);
  item.append(itemText);
  item.append(buttonGroup);

  //Возвращаем object
  return {
    item,
    itemText,
    doneBtn,
    deleteBtn,
  }
};

//содание id
function newId(arr) {
  let max = 0;

  for (let item of arr) {
    if(item.id > max) {
      max = item.id;
    }
  }
  return max + 1;
}

//Создание приложения
async function createTodoApp(containerElement, {
  title,
  owner,
  todoItemList = [],
  onCreateFormSubmit,
  onDoneClick,
  onDoneDelete,
}) {

  const container = document.getElementById(containerElement);
  const todoAppTitle = createAppTitle(title);
  const todoItemForm = createTodoItemForm();
  const todoList = createTodoList();
  const handlers =  {
    onDone: onDoneClick,
    onDelete: onDoneDelete,
  }

  arrDone = todoItemList;

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  if (todoItemList.length !== 0) {
    todoItemList.forEach(todoItem => {
      const todoItemElem = createTodoItem(todoItem, handlers);
      todoList.append(todoItemElem.item);
    });
  }

  //Событие на кнопку "Добавить дело"
  document.addEventListener('submit', async (e) => {
    e.preventDefault();

    if(!todoItemForm.input.value) {
      return
    };

    //Запись дела в объект
    let newElem = {
      id: newId(todoItemList),
      name: todoItemForm.input.value.trim(),
      done: false,
    };

    todoItemList.push(newElem);

    const todoItem = await onCreateFormSubmit({
      owner,
      name: newElem.name,
      arr: todoItemList,
      newElem,
    });

    //Отрисовка дела
    const todoItemElem = createTodoItem(todoItem, handlers);
      todoList.append(todoItemElem.item);

    todoItemForm.form.reset();
    todoItemForm.button.disabled = true;
  });
}

export {createTodoApp};
