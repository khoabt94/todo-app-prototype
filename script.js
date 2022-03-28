const appEl = document.querySelector('.app');
const todosEl = appEl.querySelector('.todos');
const TODO_LIST = [
  {
    title: 'Code',
    isComplete: false,
  },
  {
    title: 'Run',
    isComplete: false,
  },
  {
    title: 'Sleep',
    isComplete: false,
  },
  {
    title: 'Eat',
    isComplete: false,
  },
];

const createMarkup = (arr) => {
  return arr
    .map((el, index) => {
      return `<li class="todo ${el.isComplete ? 'check' : ''}" data-value=${index}>
                  <p class="todo__title" >
                      ${el.title}
                  </p>
                  <button class="btn--edit">Edit</button>
                  <button class="btn--check">Check</button>
                  <button class="btn--delete">Delete</button>
              </li>`;
    })
    .join('');
};

const createMarkupInput = (value, index) => {
  return `<li class="todo" data-value=${index}>
                    <input type="text" value=${value} class="todo__input"/>
                    <button class="btn--done">Done</button>
                    <button class="btn--delete">Delete</button>
                </li>`;
};

const editFunction = (e) => {
  const checkTarget = e.target.closest('.todo');
  const checkTargetContent = checkTarget.querySelector('.todo__title').textContent;
  const checkTargetIndex = +checkTarget.dataset.value;
  const markup = createMarkupInput(checkTargetContent, checkTargetIndex);
  checkTarget.textContent = '';
  checkTarget.insertAdjacentHTML('afterbegin', markup);

  const btnDone = checkTarget.querySelector('.btn--done');
  btnDone.addEventListener('click', (e) => {
    const updateTarget = e.target.closest('.todo');
    const updateTargetContent = updateTarget.querySelector('.todo__input').value;
    const updateTargetIndex = +updateTarget.dataset.value;
    TODO_LIST[updateTargetIndex].title = updateTargetContent;
    render(TODO_LIST);
  });
};

const checkFunction = (e) => {
  const checkTarget = e.target.closest('.todo');
  const checkIndex = +checkTarget.dataset.value;
  TODO_LIST[checkIndex].isComplete = true;
  render(TODO_LIST);
};

const deleteFunction = (e) => {
  const deleteTarget = e.target.closest('.todo');
  const deleteIndex = +deleteTarget.dataset.value;
  TODO_LIST.splice(deleteIndex, 1);
  render(TODO_LIST);
};

const render = (listTodo) => {
  // Clear UI
  todosEl.textContent = '';

  // Create Markup
  const markup = createMarkup(listTodo);

  // Render
  todosEl.insertAdjacentHTML('afterbegin', markup);

  // Bind Edit function
  const btnEdit = [...appEl.querySelectorAll('.btn--edit')];
  const btnCheck = [...appEl.querySelectorAll('.btn--check')];
  const btnDelete = [...appEl.querySelectorAll('.btn--delete')];

  btnEdit.forEach((btn) => btn.addEventListener('click', (e) => editFunction(e)));
  btnCheck.forEach((btn) => btn.addEventListener('click', (e) => checkFunction(e)));
  btnDelete.forEach((btn) => btn.addEventListener('click', (e) => deleteFunction(e)));
};

render(TODO_LIST);
