import React from 'react';
import useTodoListActions from '../reducers/useTodoListActions.js';
import { withFirebase } from '../api';


const Archive = (props) =>{
	const [todosLists, setTodos] = React.useState([]);
	React.useEffect(()=>{
		let items = [];
		props.setIsLoading(true);
		props.firebase.getTodos(props.currentUser.uid).then(data=>{
			data.forEach(function(childSnapshot) {
    		var childKey = childSnapshot.key;
    		var childData = childSnapshot.val();
    		items = [...items, childData]
  		});
  		setTodos(items.reverse());
  		props.setIsLoading(false);
		});
		return ()=>{
			// setTodos([]);
		}
	}, [])
	const { dispatch } = useTodoListActions();

	const handleClick = (items) =>{
		// dispatch({type: 'edit', items: items});

	}
	console.log(todosLists)

  return (
  	<ul className="col-lg-5 col-sm-8 col-xs-11 mx-auto">
          {todosLists.length || props.isLoading ? todosLists.map((todo, i) => (
          	<div onClick={handleClick(todo)} class="card to-do-card">
          	  <div id={`${todo.title}-${i}`}  class="card-block">
          	    <h4 class="card-title">{todo.title}</h4>
  							<ul class="list-group list-group-flush">
  							{todo.items.map(item=> (<li className="list-group-item">{item.content}</li>))}
  							</ul>
  							<p class="float-right card-text"><small class="">{todo.dateCreated}</small></p>
  						</div>
						</div>)
          ): <h3 className="top-height error-text"> You have nothing <span className="msg-style"> TO-DO </span></h3>}
        </ul>
  	)
}

export default withFirebase(Archive);