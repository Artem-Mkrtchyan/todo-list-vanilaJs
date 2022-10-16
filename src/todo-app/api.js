export async function getTodoList(owner) {
  const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
  return await response.json();
}

export async function createTodoItem({ name, owner }) {
  const response = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    body: JSON.stringify({
      name,
      owner,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await response.json();
}

export function switchTodoItemDone({ obj }) {
  obj.done = !obj.done;
  fetch(`http://localhost:3000/api/todos/${obj.id}`,{
    method: 'PATCH',
    body: JSON.stringify({
      done: obj.done,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function deleteTodoItem({obj, element}) {
  if (!confirm('Хотите удалить дело?')) {
    return
  }
  element.remove();
  fetch(`http://localhost:3000/api/todos/${obj.id}`,{
    method: 'DELETE',
  })
}
