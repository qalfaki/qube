import React from 'react';

const useStorage = () =>{
  const [user, setUser] = React.useReducer((state, action)=>{
	let newState = action ? {
	  displayName: action.displayName,
	  email: action.email,
	  photoURL: action.photoURL
	 }: action;

	 localStorage.setItem('user', JSON.stringify(newState));
	 return newState
  }, JSON.parse(localStorage.getItem('user')));
  return {user, setUser}
}

export default useStorage;