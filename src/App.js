import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import routes from './routes';
import './App.css';
import useStorage from './reducers/useStorage.js';

const App = (props) => {
  // global state
  //   "user session":
  //   the setter will be passed down to child componets
  //   and update this state and the other components will behave accordingly

  //  <Redirect />
  //  the redirection acts a global intercepter
  //  and will load the relvant page based on the state
  const {user, setUser} = useStorage();
  const [isLoading, setIsloading] = React.useState(false);

  return (
    <Router>
    	<div className="App">
        {isLoading ? <span className='overlay'>
        <div className='spinner'><i></i></div></span>: null}
     	  {routes.map((route, idx)=> <Route key={idx}  path={route.path} render={(props)=> <route.component {...props} setIsloading={setIsloading} currentUser={user} stateHandler = {setUser}/>} />)}
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
