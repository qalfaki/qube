import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import routes from './routes';
import './App.css';

function App() {
  return (
    <Router>
    	<div className="App">
     		{routes.map((route,idx)=> <Route key={idx} {...route} />)}
			<footer>
      			<small className="footer">
    				copyrights reserved @Qube
      			</small>
    		</footer>
    	</div>
    </Router>
  );
}

export default App;
