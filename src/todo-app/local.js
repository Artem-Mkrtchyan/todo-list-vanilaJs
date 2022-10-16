//Запись данных в localStorage
function seveDataStorage(arr, key) {
  localStorage.setItem(key, JSON.stringify(arr));
}

//Массив с данными из local-storage по ключу 'owner'
export function getTodoList(owner) {
  let localData = localStorage.getItem(owner);

  if (localData !== null && localData !== '') {
    localData = JSON.parse(localData);
    return localData
  }

}

export function createTodoItem({ arr, owner, newElem}) {
  newElem.keyStorage = owner;
  //запись массива в localStorage
  seveDataStorage(arr, newElem.keyStorage);

  return newElem;
}

export function switchTodoItemDone({ arr, obj }) {
  obj.done = !obj.done;
  seveDataStorage(arr, obj.keyStorage)
}


export function deleteTodoItem({arr, obj, element}) {
  if (!confirm('Хотите удалить дело?')) {
    return
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === obj.id) {
      arr.splice(i, 1);
    }
  }
  element.remove();
  seveDataStorage(arr, obj.keyStorage)
}
