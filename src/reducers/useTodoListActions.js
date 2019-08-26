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
  const [currentTodo, setCurrentTodo] = React.useState(Object.assign({}, defaultTodo))
  const [isValid, setIsValid] = React.useReducer((state, action)=>{
    return action.length > 0
  }, false);
  const reducer = (state, action) =>{
	let newState = [...state];
	let tmpTodo = {...currentTodo}
	switch(action.type) {
      case 'add': {
      	tmpTodo['dateCreated'] = new Date();
      	newState.push(tmpTodo);
        state = assignIds(newState);
        break;
      }
      case 'update': {
      	newState.forEach(i=>{
      	  if (i.id == tmpTodo.id) {
			tmpTodo['dateUpdate'] = new Date();
      	    Object.assign(i,  tmpTodo);
      	  }
      	});
      	state = assignIds(newState);
      	break;	
      }
      case 'delete': {
      	newState.splice(action.index, 1);
        state = assignIds(newState);
        setCurrentTodo(state[state.length-1])
        setIsValid(state[state.length-1].content);
        break;
      }
      default:
      return state
    }
    console.log('just before the return ', state)
    return state;
  }

  const [todoList, dispatch] = React.useReducer(reducer, [currentTodo]);

  return {isValid, setIsValid, todoList, dispatch, currentTodo, setCurrentTodo, defaultTodo}
}

export default useTodoListActions;