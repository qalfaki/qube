import React from 'react';

const useStorage = (props) =>{
  const [user, setUser] = React.useReducer((state, action)=>{
	let newState = action || null
	localStorage.setItem('user', JSON.stringify(newState));
	return newState
  }, JSON.parse(localStorage.getItem('user')));
  return {user, setUser}
}

export default useStorage;