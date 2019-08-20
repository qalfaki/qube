import React from 'react';

const Todo = (props) =>{
  let defaultTodo = {
    id: 1,
    content: '',
    isDone: false
  }

  const [currentTodo, setCurrentTodo] = React.useState(defaultTodo);

  const todoReducer = (state, action) =>{
    const markDone = (item) =>{
      return {isDone: true, ...item}
    }
    switch(action.type) {
      case 'update': {
        state = {...state, ...action.item}
        return state
      }
      case 'markDone': {
        return markDone(state)
      }
    }
    return state
  }

  const todoListReducer = (state, action) => {
    const remove = (item)=>{
      const index = state.indexOf(item);
      if (index > -1) {
        state.splice(index, item);
      }
      return state;
    }

    const update = (index, item) => {
      state[index] = item;
    }
    const add = (index, item)=>{
      // const newTodos = [...state];
      state.splice(index + 1, 0, {id: index, ...item});
        setTimeout(() => {
        document.forms[0].elements[index + 1].focus();
      }, 0);
    }

    switch(action.type) {
      case 'add': {
        console.log('i was added ', action.item, action)
        return add(action.index, action.item);
      }
      case 'remove': {
        return remove(action.index, action.item);
      }
      case 'update': {
        update(action.index, action.item);
      }
    }
    return state
  }

  const [todos, setTodos] = React.useState([currentTodo]);
   function handleKeyDown(e, i) {
    if (e.key === 'Enter') {
      createAtIndex(e, i);
    }
    if (e.key === 'Backspace' && todos[i].content === '') {
      e.preventDefault();
      return removeAtIndex(i);
    }
  }

  function createAtIndex(e, i) {
    const newTodos = [...todos];
    newTodos.splice(i + 1, 0, {
      content: '',
      isCompleted: false,
    });
    setTodos(newTodos);

    // wait for the event loop
    setTimeout(() => {
      document.forms[0].elements[i + 1].focus();
    }, 0);
  }

  function updateAtIndex(e, i) {
    const newTodos = [...todos];
    newTodos[i].content = e.target.value;
    if (!newTodos[i].isCompleted) {
      setTodos(newTodos);
    }
  }

  function removeAtIndex(i) {
    if (i === 0 && todos.length === 1) return;
    setTodos(todos => todos.slice(0, i).concat(todos.slice(i + 1, todos.length)));
    setTimeout(() => {
      document.forms[0].elements[i - 1].focus();
    }, 0);
  }

  function toggleCompleteAtIndex(index) {
    const temporaryTodos = [...todos];
    if (!temporaryTodos[index].content.length){return;}
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodos(temporaryTodos);
  }

  return (
      <form className="todo-list">
        <ul className="col-lg-7 col-sm-11 mx-auto">
          {todos.map((todo, i) => (
            <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`} key={i}>
              <div className={'checkbox'} onClick={() => toggleCompleteAtIndex(i)}>
                {todo.isCompleted && (
                  <span>&#x2714;</span>
                )}
              </div>
              <input
                type="text"
                placeholder={todos.length > 1 ? 'something else ...?': 'Write something...'}
                value={todo.content}
                onKeyDown={e => handleKeyDown(e, i)}
                onChange={e => updateAtIndex(e, i)}
              />
            </div>
          ))}
        </ul>
      </form>
  );
}

export default Todo;