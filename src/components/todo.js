import React from 'react';
import useTodoListActions from '../reducers/useTodoListActions.js'


const Todo = (props) =>{

  const {isValid, setIsValid, todoList, dispatch, currentTodo, setCurrentTodo, defaultTodo} = useTodoListActions();
  const enterKeyPressed = (e)=>{
    // check if the previous item `isValid`
    if (isValid && currentTodo.content.length) {
    // if true allow adding new item
      setCurrentTodo(Object.assign({}, defaultTodo))
      setIsValid(currentTodo.content);
      dispatch({type: 'add'});
    }
    e.preventDefault();
  }

  const backspaceKeyPressed = (e, i) =>{
    if (e.key === 'Backspace' && !currentTodo.content.length && todoList.length > 1) {
      dispatch({type: 'delete', index: i});
      e.preventDefault();
    }
  }

  const handleKeyPress = (e,i) => {
    if (e.key === 'Enter') {
      enterKeyPressed(e)
    }

    if (e.key === 'Backspace') {
      backspaceKeyPressed(e, i);
    }
  }


  const toggleComplete = (item)=> {
    setCurrentTodo(item);
    document.getElementsByName(`todo-${item['id']}`)[0].focus();
    if (isValid) {
      item.isCompleted = !item.isCompleted;
      dispatch({type: 'update'});
    }
  }

 
  return (
      <form className="todo-list">
        <ul className="col-lg-7 col-sm-11 mx-auto">
          {todoList.map((todo, i) => (
            <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`} key={i}>
              <div className={'checkbox'} name={`todo-check-${todo['id']}`} onClick={(e) => {
                toggleComplete(todo, i)
              }}>
                {todo.isCompleted && (
                  <span>&#x2714;</span>
                )}
              </div>
              <input
                name={`todo-${todo['id']}`}
                autoFocus
                type="text"
                placeholder={todoList.length > 1 ? 'something else ...?': `Write something... ${props.name}`}
                value={todo.content}
                onFocus={()=> {setCurrentTodo(todo)}}
                onKeyDown={e => handleKeyPress(e, i)}
                onChange={e =>{
                  if (!currentTodo.isCompleted) {
                    currentTodo.content = e.target.value;
                    setIsValid(currentTodo.content);
                    dispatch({
                      type: 'update'
                    })
                  }}}
              />
            </div>
          ))}
        </ul>
      </form>
  );
}

export default Todo;