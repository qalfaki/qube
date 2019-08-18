import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props)=> {
	console.log('the props in Sidebar ', props);
	return (
		<div className={props.toggle ? "sidebar-wrapper toggle-sidebar": "sidebar-wrapper"}>
			<ul className="navigation">
  				<li><Link className="link" to="/to-do">TO Do</Link></li>
  				<li><Link className="link" to="/goals">GOALS</Link></li>
  				<li><Link className="link" to="/archive">ARCHIVE</Link></li>
  			</ul>
		</div>
	)
}

export default Sidebar;