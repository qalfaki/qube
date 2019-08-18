import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo196x143.png';
import useCredintialsValidation from '../reducers/useCredintialsValidation.js';

const Login = (props) =>{
  const {password, setPassword, passwordValid, email, setEmail, emailValid} = useCredintialsValidation();
  const [error, setError] = React.useState('');
  return (
  	<div className="top-height col-12 row"><div className="mx-auto d-block">
    	  	    <img src={logo} alt='no img' className="mx-auto d-block"/>
              <p className="error-text">{error}</p>
    	  	    <input className="input-field form-control d-block mx-auto" type="email" id="email" onChange={(e)=>setEmail(e.target.value)} value={email} aria-describedby="emailHelp" placeholder="EMAIL"/>
    	  	    <input className="input-field form-control d-block mx-auto" type="password" id="password" onChange={(e)=>setPassword(e.target.value)} value={password} aria-describedby="emailHelp" placeholder="PASSWORD"/>
    	  	    <div className="btn-wrapper">
    	  	    <Link to="/signup" className="link">SIGNUP</Link> <span className="error-text">|</span> <Link to="/reset" className="link">RESET PASSWORD</Link>
    	  	    		<button type="button" onClick={(e)=>{
                    setError(!emailValid && !passwordValid ? 'Invalid Credintials': !emailValid ? 'Invalid Email': !passwordValid ? 'password must be at least 6 characters':'')
                  } } className="btn float-right auth-btns">LOGIN</button>
    	  	    	</div>
    	  	    </div>
    	  	</div>
  	)
}

export default Login;