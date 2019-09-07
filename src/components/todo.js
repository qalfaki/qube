import React from 'react';
import useTodoListActions from '../reducers/useTodoListActions.js'
import { withFirebase } from '../api';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';


const Todo = (props) =>{

  const [showTodTitle, setShowTodoTitile] = React.useState(false);
  const [todoListName, setTodoListName] = React.useState('');
  const [saving, setSaving] = React.useState(false);
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

  const saveTodoList = ()=> {
    if (todoList.length && todoList[0].content) {
      let data = {
        dateCreated: new Date().toISOString().slice(0, 19).replace('T', ' '),
        [todoListName]: todoList
      }
      props.setIsLoading(true);
      props.firebase.todoList().push({[props.currentUser.uid]:data}).then(()=>{
        props.setIsLoading(false);
        setSaving(true);
        setTimeout(()=>{setSaving(false)}, 4000)
      }).catch((error)=>{
        props.setIsLoading(false);
      })
    }
  }

  const backspaceKeyPressed = (e, i) =>{
    if (e.key === 'Backspace' && !currentTodo.content.length && todoList.length > 1 && i) {
      dispatch({type: 'delete', index: i});
      e.preventDefault();
    }
  }

  const handleKeyPress = (e, i) => {
    if (e.key === 'Enter') {
      if (showTodTitle && todoListName && todoList.length) {
        e.preventDefault();
        saveTodoList()
      }
      else {
        enterKeyPressed(e);
      }
    }
    else if (String.fromCharCode(e.which).toLowerCase() === 's' && e.ctrlKey) {
      e.preventDefault();
      setShowTodoTitile(true);
    }
    else if (e.key === 'Backspace') {
      backspaceKeyPressed(e, i);
    }
    else if (e.key === 'Escape') {
      setShowTodoTitile(false);
      document.getElementsByName(`todo-${currentTodo['id']}`)[0].focus();
    }
  }


  const toggleComplete = (item)=> {
    setCurrentTodo(item);
    if (isValid) {
      item.isCompleted = !item.isCompleted;
      dispatch({type: 'update'});
    }
  }

  return (
      <form className="todo-list">
          {saving ? <Toast><ToastHeader>
            {todoListName}
          </ToastHeader>
          <ToastBody>
            was saved successfully
          </ToastBody>
        </Toast> : null}
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
          {showTodTitle ?
        <input autoFocus onKeyDown={handleKeyPress} className="form-control input-field" onChange={(e)=> setTodoListName(e.target.value)} placeholder="Todo list name"/>: null}
        </ul>
      </form>
  );
}

const todoForm = withFirebase(Todo);
export default todoForm;