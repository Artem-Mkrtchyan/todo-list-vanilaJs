//Подключение елементов todo
import { createTodoApp } from './todo-app/view.js';
//Подключение кнопки переключения хранилища
import { createSwitchStorage } from './todo-app/switchStorage.js'
//Объект с переключателем хранилища
const switchStorage = createSwitchStorage();

//Парсим значение флага из localStorage
let flag = JSON.parse(localStorage.getItem(switchStorage.keyStorage));

//Создание приложения
const owner = 'я';
(  ()=> {
  function choiceStorage() {
    if (flag) {
      return import('./todo-app/api.js');
    }
    return import('./todo-app/local.js');
  }

  const storage = choiceStorage();
  storage.then(async (module) => {
    const todoItemList = await module.getTodoList(owner);
    createTodoApp('todo-app', {
      title: 'Мои дела',
      owner,
      todoItemList,
      onCreateFormSubmit: module.createTodoItem,
      onDoneClick: module.switchTodoItemDone,
      onDoneDelete: module.deleteTodoItem,
    })
  })
})()
