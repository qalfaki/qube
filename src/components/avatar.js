import React from 'react';
import img from '../assets/images/me.jpg';

const Avatar = (props) =>{
	return (
        <a className="avatar" rel="nofollow">
        	<div className="img">
        		<img src={props.imgSrc || 'https://api.adorable.io/avatars/189/abott@adorable.png'} alt="N/A"/>
        	</div>
        </a>
  	)
}

export default Avatar;