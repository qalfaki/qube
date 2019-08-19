import React from 'react';
import logo from '../assets/images/logo196x143.png';
import useSignupValidation from '../reducers/useSignupValidation.js';

const Signup = (props) =>{
 	const {
 		setPassword,
 		password,
 		confirmPassword,
 		setConfirmPassword,
 		passwordConfirmed,
 		setEmail,
 		email,
 		emailValid,
 		nameValid,
 		name,
 		setName
 	} = useSignupValidation();
 	console.log('the pass v', passwordConfirmed)
 	const [error, setError] = React.useState('');
 
	return (
  		<div className="top-height col-12 row">
  		  <div className="mx-auto d-block">
   			<img src={logo} alt='no img' className="mx-auto d-block"/>
        	<p className="error-text">{error}</p>
        	<div className="signup-form-wrapper">
        	<div className="input-fileds">
    			<input className="input-field form-control" type="email" id="email" onChange={(e)=>setEmail(e.target.value)} value={email} aria-describedby="emailHelp" placeholder="EMAIL"/>
    			<input className="input-field form-control" type="name" id="name" onChange={(e)=>setName(e.target.value)} value={name} aria-describedby="emailHelp" placeholder="NAME"/>
    			<input className="input-field form-control" type="password" id="password" onChange={(e)=>setPassword(e.target.value)} value={password} aria-describedby="emailHelp" placeholder="PASSWORD"/>
    			<input className="input-field form-control" type="password" id="confirm-password" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} aria-describedby="emailHelp" placeholder="CONFIRM PASSWORD"/>
    		</div>
    		<div className="uploader-wrapper">
                <div className="uploader-container">
                    <div className="plus-icon">
                        <div className="horizontal"></div>
                        <div className="vertical"></div>
                    </div>
                </div>
    			<input type="file" className="image-uploader" placeholder="upload image"/>
    		</div>
    		</div>
    		<p></p>
    		<div className="">
    		<a href="/login" className="link">LOGIN</a>
    		<button type="button" onClick={(e)=>setError(!emailValid ? 'Invalid Email': '')} className="float-right btn auth-btns">SIGN UP</button>
    	</div>
    	</div>
    </div>
  	)
}

export default Signup;