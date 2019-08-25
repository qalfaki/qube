import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import logo from '../assets/images/logo196x143.png';
import useSignupValidation from '../reducers/useSignupValidation.js';
import {withFirebase} from '../api'

const SignupBase = (props) =>{

    const [file, setFile] = React.useState(null);
    const handleClick = () => {
        console.log('the error ', props);
        props.setError(!props.emailValid ? 'Invalid Email': '')
        if (!(props.emailValid && props.nameValid && props.passwordConfirmed)) {
            console.log('am i returning ?')
            return
        }
        props.firebase.signUp(props.email, props.password).then(authUser => {
          // Create a user in your Firebase realtime database
          console.log('the authUser ', authUser);
          // upload the photo
          props.firebase.user(authUser.user.uid).set({
            name: props.name,
            email: props.email
          });

          if (file) {
            props.firebase.upload(authUser.user.uid, file).then(()=>{
              props.firebase.user(authUser.user.uid).set({
                name: props.name,
                email: props.email,
                photoUrl: `${authUser.user.uid}/profilePicture/${file.name}`
              });
            }).catch((error)=>{
                props.setError(error.message)
            })
          }
          props.firebase.user(authUser.user.uid).set({
            name: props.name,
            email: props.email
          });
          props.history.push('/home');
      })

    }
	return (
  		<div className="top-height col-12 row">
  		  <div className="mx-auto d-block">
   			<img src={logo} alt='no img' className="mx-auto d-block"/>
        	<p className="error-text">{props.error}</p>
        	<div className="signup-form-wrapper">
        	<div className="input-fileds">
    			<input className="input-field form-control" type="email" id="email" onChange={(e)=>props.setEmail(e.target.value)} value={props.email} aria-describedby="emailHelp" placeholder="EMAIL"/>
    			<input className="input-field form-control" type="name" id="name" onChange={(e)=>props.setName(e.target.value)} value={props.name} aria-describedby="emailHelp" placeholder="NAME"/>
    			<input className="input-field form-control" type="password" id="password" onChange={(e)=>props.setPassword(e.target.value)} value={props.password} aria-describedby="emailHelp" placeholder="PASSWORD"/>
    			<input className="input-field form-control" type="password" id="confirm-password" onChange={(e)=>props.setConfirmPassword(e.target.value)} value={props.confirmPassword} aria-describedby="emailHelp" placeholder="CONFIRM PASSWORD"/>
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

const SignupPage = (props)=>{
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

    return (
        <><SignupForm error={error} setError={setError} setConfirmPassword={setConfirmPassword} setPassword = {setPassword} password={password} email={email} setEmail={setEmail} setName={setName} name={name} emailValid={emailValid} nameValid={nameValid} passwordConfirmed={passwordConfirmed} {...props}/></>
    )
}

const SignupForm = compose(
    withRouter,
    withFirebase,
)(SignupBase);

export default SignupPage;