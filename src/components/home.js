import React from 'react';
import Sidebar from './sidebar.js';
const Home = (props) =>{
  return (<div>
	<nav className="navbar navbar-light">
		<button type="button" className="btn btn-dark btn-circle btn-xl"><span></span></button>
	</nav>
  		<div className="wrapper">
		<Sidebar/>
		<div className="page-content">
			<div className="cheat-sheet-container"></div>
		</div>
  	</div>
  </div>)
}

export default Home;


// <form className="todo-list">
//   			<ul>
//   				<div className="todo">
//   					<div className="checkbox"></div>
//   					<input type="text" value="Pickup dry cleaning"/>
//   				</div>
//   			</ul>
// </form>