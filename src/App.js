import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import routes from './routes';
import './App.css';

const App = (props) => {
  const [user, setUser] = React.useState(null);
  return (
    <Router>
    	<div className="App">
     	  {routes.map((route, idx)=> <Route key={idx}  path={route.path} render={(props)=> <route.component {...props} currentUser={user} stateHandler = {setUser}/>} />)}
        <Route path='/'>
          <Redirect to="/home" />
        </Route>
        {user ? null: <Redirect path='/login' to='/login'/>}
			 <footer>
      	<small className="footer">copyrights reveresed @Qube</small>
    	</footer>
    	</div>
    </Router>
  )
}

export default App;
