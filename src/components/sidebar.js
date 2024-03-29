import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props)=> {
	// TODO: ADD GOALS
	// <li><Link className="link" to="/goals">GOALS</Link></li>
	return (
		<div className={props.toggle ? "sidebar-wrapper toggle-sidebar": "sidebar-wrapper untoggle-sidebar"}>
			<ul className="navigation">
  				<li><Link className="link" to="/">NEW TO-DO
  				</Link></li>
  				<li><Link className="link" to="/archive">SAVED TO-DOS</Link></li>
  			</ul>
		</div>
	)
}

export default Sidebar;