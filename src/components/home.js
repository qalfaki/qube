import React from 'react';
import Todo from './todo.js';
import { withFirebase } from '../api';

const Home = (props) =>{
  return (
  	<div>
			<div className="cheat-sheet-container">
				<h5>CHEAT SHEET</h5>
				<div>SAVE: <b>Ctl + s</b></div>
				<div>CANCEL: <b>Esc</b></div>
			</div>
			<Todo {...props} setIsLoading={props.setIsLoading} name={props.currentUser && props.currentUser.name ? props.currentUser.name.split(' ')[0]: ''}/>
		</div>)
}

export default withFirebase(Home)