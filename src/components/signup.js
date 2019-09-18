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
    const [error, setError] = React.useState('');
    const [file, setFile] = React.useState(null);
    const updateUserData = (authUser)=>{
        let currentUser = props.firebase.auth.currentUser;
        let imagePromise = new Promise((resolve, reject)=>{
            if (file) {
                props.firebase.upload(authUser.user.uid, file).then(snapshot=>{
                    snapshot.ref.getDownloadURL().then((url)=>{
                        resolve(url)
                    })
                }).catch(error=>{
                    setError(error.message);
                    reject(error);
                });
            }
            else {
                resolve(null);
            }
        });
        imagePromise.then(imageURL=>{
            currentUser.updateProfile({
                displayName: name,
                email: email,
                photoURL: imageURL
            }).then((data)=>{
                props.stateHandler({name: authUser.user.displayName, uid: authUser.user.uid, photoURL: authUser.user.photoURL, email: authUser.user.email});
                props.history.push('/');
                props.setIsLoading(false);
                setName('');
                setPassword('');
                setEmail('');
                setConfirmPassword('');
                localStorage.removeItem('editItem');
            }).catch(error=> {
                setError(error.message);
                props.setIsLoading(false);
            });
        })
    }
    const handleClick = () => {
        setError(!emailValid ? 'Invalid Email': '')
        if (!(emailValid && nameValid && passwordConfirmed)) {
            return
        }
        props.setIsLoading(true);
        props.firebase.signUp(email, password).then(authUser => {
          setName('');
          setPassword('');
          setEmail('');
          setConfirmPassword('')
          updateUserData(authUser);
        }).catch(error=>{
            setError(error.message);
            props.setIsLoading(false);
        })
    }
	return (
  		<div className="top-height col-12 row">
  		  <div className="mx-auto d-block">
   			<img src={logo} alt='no img' className="mx-auto d-block"/>
        	<p className="error-text">{error}</p>
        	<div className="signup-form-wrapper">
        	<div className="input-fileds">
    			<input className="input-field form-control" type="email" id="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="EMAIL"/>
    			<input className="input-field form-control" type="name" id="name" onChange={(e)=>setName(e.target.value)} value={name} placeholder="NAME"/>
    			<input className="input-field form-control" type="password" id="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="PASSWORD"/>
    			<input className="input-field form-control" type="password" id="confirm-password" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="CONFIRM PASSWORD"/>
    		</div>
    		<div className="uploader-wrapper">
                <div className="plus-icon">
                    <div className="horizontal"></div>
                    <div className="vertical"></div>
                </div>
    			<input type="file" className="image-uploader" onChange={(e)=>{
                    setFile(e.target.files[0])
                }} placeholder="upload image"/>
    		</div>
    		</div>
    		<p></p>
    		<div>
    		    <a href="/login" className="link">LOGIN</a>
    		    <button type="button" onClick={handleClick} className="float-right btn auth-btns">SIGN UP</button>
    	    </div>
    	</div>
    </div>)
}


const SignupForm = compose(
    withRouter,
    withFirebase,
)(SignupBase);

export default SignupForm;