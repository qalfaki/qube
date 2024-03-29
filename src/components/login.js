import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../assets/images/logo196x143.png';
import useCredintialsValidation from '../reducers/useCredintialsValidation.js';
import { withFirebase } from '../api';
import { compose } from 'recompose';

const Login = (props) =>{
  const {password, setPassword, passwordValid, email, setEmail, emailValid} = useCredintialsValidation();
  const [error, setError] = React.useState('');
  const handleClick = () =>{
    if (emailValid && passwordValid) {
      props.setIsLoading(true);
      props.firebase.signIn(email, password).then((authUser)=>{
        props.setIsLoading(false);
        props.history.push('/');
        props.stateHandler({name: authUser.user.displayName, uid: authUser.user.uid, photoURL: authUser.user.photoURL, email: authUser.user.email});
      }).catch((error)=>{
        props.setIsLoading(false);
        setError(error.message);
      })
    }
  }
  return (
  	<div className="grid login">
      <div className="item column-wrapper">
    	  <img src={logo} alt='no img' className=""/>
        <p className="item error-text">{error}</p>
    	  <input className="item input-field form-control" type="email" id="email" onChange={(e)=>{setError(''); setEmail(e.target.value)}} value={email} aria-describedby="emailHelp" placeholder="EMAIL"/>
    	  <input className="item input-field form-control" type="password" id="password" onChange={(e)=>{setPassword(e.target.value); setError('')}} value={password} aria-describedby="emailHelp" placeholder="PASSWORD"/>
    	  <div className="btn-wrapper">
    	    <Link to="/signup" className="link">SIGNUP</Link> <span className="error-text">|</span> <Link to="/reset" className="link">RESET PASSWORD</Link>
    	    <button type="button" onClick={(e)=>{
            setError(!emailValid && !passwordValid ? 'Invalid Credentials': !emailValid ? 'Invalid Email': !passwordValid ? 'password must be at least 6 characters':'');
            handleClick()
          }} className="btn auth-btns">LOGIN</button>
    	 </div>
      </div>
    </div>
  	)
}

const LoginPage = compose (
  withFirebase,
  withRouter)(Login)

export default LoginPage;