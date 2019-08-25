import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import logo from '../assets/images/logo196x143.png';
import useSignupValidation from '../reducers/useSignupValidation.js';
import { withFirebase } from '../api'

const SignupBase = (props) =>{

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

    const [user, setUser] = React.useState(null);
    const [error, setError] = React.useState('');
    const [file, setFile] = React.useState(null);

    const handleClick = () => {
        setError(!emailValid ? 'Invalid Email': '')
        if (!(emailValid && nameValid && passwordConfirmed)) {
            return
        }
        props.firebase.signUp(email, password).then(authUser => {
          // Create a user in your Firebase realtime database
          console.log('the authUser ', authUser);
          // upload the photo
          props.firebase.user(authUser.user.uid).set({
            name: name,
            email: email
          });

          if (file) {
            props.firebase.upload(authUser.user.uid, file).then(()=>{
              props.firebase.user(authUser.user.uid).set({
                name: name,
                email: email,
                photoUrl: `${authUser.user.uid}/profilePicture/${file.name}`
              });
            }).catch((error)=>{
                setError(error.message)
            })
          }
          props.firebase.user(authUser.user.uid).set({
            name: name,
            email: email
          });
          props.history.push('/home');
      })

    }
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
    			<input type="file" className="image-uploader" onChange={(e)=>{
                    setFile(e.target.files[0])
                }} placeholder="upload image"/>
    		</div>
    		</div>
    		<p></p>
    		<div className="">
    		<a href="/login" className="link">LOGIN</a>
    		<button type="button" onClick={handleClick} className="float-right btn auth-btns">SIGN UP</button>
    	</div>
    	</div>
    </div>
  	)
}


const SignupForm = compose(
    withRouter,
    withFirebase,
)(SignupBase);

export default SignupForm;