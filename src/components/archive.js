import React from 'react';


const Archive = (props) =>{
	const todoList = ['go shopping in kibera', 'read microservices chaper a day', 'fix front gear changer f the bicycle', 'buy front and rare lights', 'fix front gear changer f the bicycle', 'buy front and rare lights'];
  return (
  	<ul className="col-lg-5 col-sm-8 col-xs-11 mx-auto">
          {todoList.map((todo, i) => (
          	<div class="card to-do-card">
          	  <div class="card-block">
          	    <h4 class="card-title">{todo}</h4>
  						<ul class="list-group list-group-flush">
    						<li class="list-group-item">Cras justo odio</li>
    						<li class="list-group-item">Dapibus ac facilisis in</li>
    						<li class="list-group-item">Vestibulum at eros</li>
  					</ul>
  					<p class="float-right card-text"><small class="">Last updated 3 mins ago</small></p>
  					</div>
					</div>)
          )}
        </ul>
  	)
}

export default Archive