import React from 'react';
import logo from '../assets/images/logo196x143.png';
import { withRouter } from 'react-router-dom';
import useCredintialsValidation from '../reducers/useCredintialsValidation.js';
import { withFirebase } from '../api';
import { compose } from 'recompose';

const Reset = (props) =>{
	
  const {email, setEmail, emailValid} = useCredintialsValidation();
  const [error, setError] = React.useState('')

  const handleClick = ()=> {
    if (emailValid) {
      props.setIsLoading(true)
      props.firebase.resetPassword(email).then(()=> {
        setError('A rest link was sent your email')
        props.setIsLoading(false);
        setTimeout(()=>{props.history.push('/login')}, 5000);
      }).catch(error=> setError(error.message))
    }
  }

  return (
  	<div className="top-height col-12 row"><div className="mx-auto d-block">
  		<a href="/login">
   			<img src={logo} alt='no img' className="mx-auto d-block"/>
   		</a>
        <p className="error-text">{error}</p>
    	<input className="input-field form-control d-block mx-auto" type="email" id="email" onChange={(e)=>setEmail(e.target.value)} value={email} aria-describedby="emailHelp" placeholder="EMAIL"/>
    	<p></p>
    	<button type="button" onClick={(e)=>{
                    handleClick();
                    setError(!emailValid ? 'Invalid Email': '');
                  } } className="mx-auto d-block btn auth-btns">RESET</button>
    	  	    	</div>
    </div> 
  	)
}

const ResetForm = compose(
  withFirebase,
  withRouter
)(Reset);

export default ResetForm;