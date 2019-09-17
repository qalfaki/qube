import React from 'react';
import useCredintialsValidation from './useCredintialsValidation.js';

const useSignupValidation = () => {
	const {password, setPassword, passwordValid, email, setEmail, emailValid} = useCredintialsValidation();
	const [nameValid, setNameValid] = React.useState(false);
	const [name, setName] = React.useReducer((state, action)=>{
		setNameValid(action.length > 0)
		return action;
	}, '');

	const reducer = (state, action) => {
		setPasswordConfirmed(passwordValid && action === password);
		return action;
	}

	const [passwordConfirmed, setPasswordConfirmed] = React.useState(false);
	const [confirmPassword, setConfirmPassword] = React.useReducer(reducer, '');

	return {
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
	}
}

export default useSignupValidation;