import React from 'react';
import Sidebar from './sidebar.js';
import Avatar from './avatar.js';
import Todo from './todo.js';
import logo from '../assets/images/logo196x143.png';
import { withFirebase } from '../api';

const Home = (props) =>{
	const [showMenu, setShowMenu] = React.useState(false);
	const [showSideBar, setShowSideBar] = React.useState(false);

	const handleClick = (e) => {
	  e.preventDefault();
	  props.firebase.signOut().then(()=>{
	  	props.stateHandler(null)
	  })
	}

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