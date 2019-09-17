import React from 'react';
import useTodoListActions from '../reducers/useTodoListActions.js'
import { withFirebase } from '../api';
import { Toast, ToastBody, ToastHeader, Tooltip } from 'reactstrap';


const Todo = (props) =>{

  const [showTodTitle, setShowTodoTitle] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const {isValid, setEditItem, editItem, setIsValid, todoList, dispatch, currentTodo, setCurrentTodo, defaultTodo} = useTodoListActions();
  const [todoListName, setTodoListName] = React.useState(editItem ? editItem.title: '');
  const [open, setTooltipState] = React.useState(false);

  React.useEffect(()=>{setIsValid(currentTodo.content)},[])

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
      let dateCreated = editItem ? editItem.dateCreated : new Date().toISOString().slice(0, 19).replace('T', ' ');
      let dateUpdated = editItem  ? new Date().toISOString().slice(0, 19).replace('T', ' '): null;
      let data = {
        title: todoListName,
        items: todoList,
        dateUpdated: dateUpdated,
        dateCreated: dateCreated
      }
      props.setIsLoading(true);
      if (editItem) {
        props.firebase.updateTodo(props.currentUser.uid, editItem.uid, data).then(data=>{
          setSaving(true);
          props.setIsLoading(false);
          setShowTodoTitle(false);
          dispatch({type: 'reset'});
          setEditItem(null);
          setTimeout(()=>{
            setSaving(false);
          }, 5000)
          localStorage.removeItem('editItem');
        })
      }
      else {
        props.firebase.addTodos(props.currentUser.uid, data).then(()=>{
          props.setIsLoading(false);
          setSaving(true);
          setShowTodoTitle(false);
          dispatch({type: 'reset'});
          setTimeout(()=>{
            setSaving(false);
          }, 5000)
        }).catch((error)=>{
          props.setIsLoading(false);
        })
      }
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
        if (editItem) {}
        saveTodoList()
      }
      else {
        enterKeyPressed(e);
      }
    }
    else if (String.fromCharCode(e.which).toLowerCase() === 's' && e.ctrlKey) {
      e.preventDefault();
      setShowTodoTitle(true);
    }
    else if (e.key === 'Backspace') {
      backspaceKeyPressed(e, i);
    }
    else if (e.key === 'Escape') {
      setShowTodoTitle(false);
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
        <Tooltip placement="left" isOpen={open} target="checkbox" toggle={()=>{setTooltipState(!open)}}>
        Mark as completed
        </Tooltip>
        <ul className="col-lg-7 col-sm-11 mx-auto">
          {todoList.map((todo, i) => (
            <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`} key={i}>
              <div id="checkbox" className={'checkbox'} name={`todo-check-${todo['id']}`} onClick={(e) => {
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
        <input autoFocus onKeyDown={handleKeyPress} value={todoListName} className="form-control input-field" onChange={(e)=> setTodoListName(e.target.value)} placeholder="Title"/>: null}
                {saving ? <Toast className="my-2 toast-style"><ToastHeader>
            {todoListName}
          </ToastHeader>
          <ToastBody>
            was saved successfully
          </ToastBody>
        </Toast> : null}

        {editItem ? <Toast className="my-2 toast-style"><ToastHeader>
            Edit
          </ToastHeader>
          <ToastBody>
           Title: {todoListName}
           <br/>
           items: {todoList.length}
          </ToastBody>
        </Toast> : null}
        </ul>
      </form>
  );
}

const todoForm = withFirebase(Todo);
export default todoForm;