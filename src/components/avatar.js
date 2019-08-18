import React from 'react';
import img from '../assets/images/me.jpg';

const Avatar = (props) =>{
  	
	return (
        <a className="avatar" rel="nofollow">
        	<div className="img">
        		<img src={img} alt="no image uploaded"/>
        	</div>
        </a>
  	)
}

export default Avatar;