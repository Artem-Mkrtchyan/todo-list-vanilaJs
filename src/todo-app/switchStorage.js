export function createSwitchStorage() {
  const button = document.createElement('button');
  const navWrapp = document.getElementById('nav-wrapper');

  button.classList.add('btn', 'btn-warning');

  let keyStorage = 'key'

  let flag = false;
  flag = JSON.parse(localStorage.getItem(keyStorage));

  if (flag) {
    button.textContent = 'Перейти на локальное хранилище';
  } else {
    button.textContent = 'Перейти на серверное хранилище';
  }

  navWrapp.append(button);

  button.addEventListener('click', () => {
    flag = !flag
    //Запись флага в LocalStorage
    localStorage.setItem(keyStorage, flag);
    //Перезагрузка страницы
    location.reload()
  })

  return {
    button,
    keyStorage
  }
}
