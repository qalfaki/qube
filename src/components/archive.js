import React from 'react';
import useTodoListActions from '../reducers/useTodoListActions.js';
import { withFirebase } from '../api';


const Archive = (props) =>{

	// todo lists state
	const [todosLists, setTodos] = React.useState([]);
	// fetch data hook
	React.useEffect(()=>{
		let items = [];
		props.setIsLoading(true);
		props.firebase.getTodos(props.currentUser.uid).then(data=>{
			data.forEach(function(childSnapshot) {
    		var childKey = childSnapshot.key;
    		var childData = childSnapshot.val();
    		items = [...items, {uid: childKey, ...childData}]
  		});
  		setTodos(items.reverse());
  		props.setIsLoading(false);
		});
	}, [])
	// dispatcher to uplay other states mutation
	const { dispatch } = useTodoListActions();

	const handleClick = (items) =>{
		dispatch({type: 'edit', item: items});
		props.history.push('/home');
	}

  return (
  	<ul className="col-lg-5 col-sm-8 col-xs-11 mx-auto">
          {todosLists.length || props.isLoading ? todosLists.map((todo, i) => (
          	<div key={`${todo.title}-${i}`} onClick={()=>handleClick(todo)} className="card to-do-card">
          	  <div key={todo.id}  className="card-block">
          	    <h4 className="card-title">{todo.title}</h4>
  							<ul className="list-group list-group-flush">
  							{todo.items.map((item, i)=> (<li key={`{item.id}-${i}`} className="list-group-item">{item.content}</li>))}
  							</ul>
  							<p className="float-right card-text"><small className="">Added on: <br/> {todo.dateCreated}</small></p>
  							{todo.dateUpdated ? <p className="card-text"><small className="">Edited on: <br/>{todo.dateUpdated}</small></p>: null}
  						</div>
						</div>)
          ): <h3 className="top-height error-text"> You have nothing <span className="msg-style"> TO-DO </span></h3>}
        </ul>
  	)
}

export default withFirebase(Archive);