import React from 'react';
import useTodoListActions from '../reducers/useTodoListActions.js'
import { withFirebase } from '../api';


const Todo = (props) =>{
  let defaultKey = {s: false, ctl: false}
  const [key, setKey] = React.useState(Object.assign({}, defaultKey));
  const [todoListName, setTodoListName] = React.useState('');

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
    setKey(Object.assign({}, defaultKey));
  }

  const saveTodoList = ()=> {
    let data = {
      [props.currentUser.uid]: {
        [todoListName]: todoList
      }
    }
    props.setIsLoading(true);
    props.firebase.postTodos(data).then(()=>{
      props.setIsLoading(false);
    }).catch((error)=>{
      props.setIsLoading(false);
    })
  }

  const backspaceKeyPressed = (e, i) =>{
    if (e.key === 'Backspace' && !currentTodo.content.length && todoList.length > 1 && i) {
      dispatch({type: 'delete', index: i});
      e.preventDefault();
    }
  }

  const handleKeyPress = (e, i) => {
    console.log(e.key)
    if (e.key === 'Enter') {
      if (key.ctl && key.s && todoListName && todoList.length) {
        saveTodoList()
      }
      else {
        enterKeyPressed(e);
      }
    }
    else if (e.key === 'Backspace') {
      setKey(Object.assign({}, defaultKey));
      backspaceKeyPressed(e, i);
    }
    else if (e.key === 'Control') {
      e.preventDefault();
      setKey({ctl: true});
    }
    else if (e.key === ('s' || 'S')) {
      
      if (!key.ctl) {
        setKey(Object.assign({}, defaultKey));
        return
      }
      e.preventDefault();
      setKey({...key, s: true});
    }
    else if (e.key === 'Escape') {
      setKey(Object.assign({}, defaultKey));
      document.getElementsByName(`todo-${currentTodo['id']}`)[0].focus();
      console.log('valid todoList ', todoListName)

    }
  }


  const toggleComplete = (item)=> {
    setCurrentTodo(item);
    document.getElementsByName(`todo-${todoList[todoList.length -1]}`)[0].focus();
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
          {key.ctl && key.s ?
        <input autoFocus onKeyDown={handleKeyPress} className="form-control input-field" onChange={(e)=> setTodoListName(e.target.value)} placeholder="Todo list name"/>: null}
        </ul>
      </form>
  );
}

const todoForm = withFirebase(Todo);
export default todoForm;