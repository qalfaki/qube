import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo196x143.png';
// import { Row, Col } from 'reactstrap';


const Login = (props) =>{
  return (
  	<div className="top-height col-12 row"><div className="mx-auto d-block">
    	  	    <img src={logo} alt='no img' className="mx-auto d-block"/>
    	  	    <input className="input-field form-control d-block mx-auto" type="email" id="email" aria-describedby="emailHelp" placeholder="EMAIL"/>
    	  	    <input className="input-field form-control d-block mx-auto" type="password" id="password" aria-describedby="emailHelp" placeholder="PASSWORD"/>
    	  	    <div className="btn-wrapper">
    	  	    <Link to="/signup" className="link">SIGNUP</Link>
    	  	    		<button type="button" className="btn float-right auth-btns">LOGIN</button>
    	  	    	</div>
    	  	    </div>
    	  	</div>
  	)
}

export default Login;