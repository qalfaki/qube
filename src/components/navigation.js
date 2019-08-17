import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) =>{
  return (
  	<ul className="navigation">
  		<li><Link className="link" to="/to-do">TO Do</Link></li>
  		<li><Link className="link" to="/goals">GOALS</Link></li>
  		<li><Link className="link" to="/archive">ARCHIVE</Link></li>
  	</ul>
  	)
}

export default Navigation;