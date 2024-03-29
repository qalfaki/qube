import React from 'react';
const useTodoListActions = () =>{

  const assignIds = (items) =>{
  	let id = 0;
  	return items.map(i=>{
  		id ++
  		i.id=id
  		return i});
  	}


  const defaultTodo = {
  	id: null,
  	content: '',
  	isComplete: false,
  	dateCreated: null,
  	dateUpdate: null,

  }
  let storedEditItem = JSON.parse(localStorage.getItem('editItem') || 'null');
  const [editItem, setEditItem] = React.useState(storedEditItem);
  const [currentTodo, setCurrentTodo] = React.useState(Object.assign({}, storedEditItem ? storedEditItem.items[storedEditItem.items.length - 1]: defaultTodo))
  const [isValid, setIsValid] = React.useReducer((state, action)=>{
    return action.length > 0
  }, false);


  const reducer = (state, action) =>{
	 let newState = [...state];
	 let tmpTodo = {...currentTodo}
	 switch(action.type) {
      case 'add':
      	tmpTodo['dateCreated'] = new Date();
      	newState.push(tmpTodo);
        state = assignIds(newState);
        break;
      case 'update':
      	newState.forEach(i=>{
      	  if (i.id === tmpTodo.id) {
			      tmpTodo['dateUpdate'] = new Date();
      	    Object.assign(i,  tmpTodo);
      	  }
      	});
      	state = assignIds(newState);
      	break;
      case 'delete':
      	newState.splice(action.index, 1);
        state = assignIds(newState);
        setCurrentTodo(state[state.length-1])
        setIsValid(state[state.length-1].content);
        break;
      case 'edit':
        localStorage.setItem('editItem', JSON.stringify(action.item))
        break
      case 'reset':
        state = [Object.assign(currentTodo, defaultTodo)]
        break
      default:
      return state
    }
    return state;
  }
  const [todoList, dispatch] = React.useReducer(reducer, storedEditItem ? storedEditItem.items: [currentTodo]);

  return {isValid, setIsValid, setEditItem, editItem, todoList, dispatch, currentTodo, setCurrentTodo, defaultTodo}
}

export default useTodoListActions;