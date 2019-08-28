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

  	return (<div>
	<nav className="nav-bar row co-12">
		<div className="col-4">
		<button type="button" onClick={(e)=>setShowSideBar(!showSideBar)} className={showSideBar ? "menu-btn_active btn btn-dark btn-circle btn-xl": "btn btn-dark btn-circle btn-xl"}><span></span></button>
		</div>
		<div className="col-4">
		<a href="/home">
			<img  src={logo} alt='no img' className="logo mx-auto d-block"/>
		</a>
		</div>
		<div className="col-4">
		<span onClick={()=>setShowMenu(!showMenu)}>

			<Avatar imgSrc={props.currentUser ? props.currentUser.photoURL: null}/>
		</span>
		</div>
	</nav>
  		<div className="wrapper">

		<Sidebar toggle={showSideBar}/>
		<div className={showSideBar ? "page-content toggle-page-content": "page-content"}>
		 {
          showMenu
            ? (<div className="avatar-menu">
    			<a className="dropdown-item" href="#" onClick={
    				handleClick
    			}>logout</a>
              </div>): (null)
        	}
			<div className="cheat-sheet-container">
			<h5>CHEAT SHEET</h5>
			<div>SAVE: <b>Ctl + s</b></div>
			<div>UNSAVE: <b>Esc</b></div>
		</div>
		<Todo name={props.currentUser && props.currentUser.name ? props.currentUser.name.split(' ')[0]: ''}/>
		</div>
  	</div>
  </div>)
}

export default withFirebase(Home)