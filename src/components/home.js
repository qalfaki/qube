import React from 'react';
import Sidebar from './sidebar.js';
import Avatar from './avatar.js';
import Todo from './todo.js';
import logo from '../assets/images/logo196x143.png';

const Home = (props) =>{
	const [showMenu, setShowMenu] = React.useState(false);
	const [showSideBar, setShowSideBar] = React.useState(false);
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
			<Avatar />
		</span>
		</div>

	</nav>
	  		 {
          showMenu
            ? (
              <div className="avatar-menu">
    			<a class="dropdown-item" href="#">Account</a>
    			<a class="dropdown-item" href="/login">logout</a>
              </div>
            )
            : (
              null
            )
        }
  		<div className="wrapper">
		<Sidebar toggle={showSideBar}/>
		<div className={showSideBar ? "page-content toggle-page-content": "page-content"}>
		<Todo/>
			<div className="cheat-sheet-container">
			<h5>CHEAT SHEET</h5>
			<p>SAVE: Ctl + s</p>
			</div>
		</div>
  	</div>
  </div>)
}

export default Home