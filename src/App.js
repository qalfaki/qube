import React from 'react';
import Sidebar from './components/sidebar.js';
import Avatar from './components/avatar.js';
import logo from './assets/images/logo196x143.png';
import { withFirebase } from './api';

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
  const [isLoading, setIsLoading] = React.useState(false);

  const [showMenu, setShowMenu] = React.useState(false);
  const [showSideBar, setShowSideBar] = React.useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    props.firebase.signOut().then(()=>{
      setUser(null);
      setShowMenu(false);
      setShowSideBar(false);
    })
  }

  return (
    <Router>
    	<div className="App">
        {isLoading ? <span className='overlay'>
        <div className='spinner'><i></i></div></span>: null}


    {user ? <nav className="nav-bar fixed-top row co-12">
      <div className="col-4">
        <button type="button" onClick={(e)=>setShowSideBar(!showSideBar)} className={showSideBar ? "menu-btn_active btn btn-dark btn-circle btn-xl": "btn btn-dark btn-circle btn-xl"}><span></span></button>
      </div>
      <div className="col-4">
        <a href="/home">
        <img  src={logo} alt='no img' className="logo mx-auto d-block"/>
    </a>
    </div>
    <div className="col-4">
    <span onClick={()=>setShowMenu(!showMenu)}>

      <Avatar imgSrc={user ? user.photoURL: null}/>
    </span>
    </div>
  </nav>: null}
  <div className="wrapper">
      <Sidebar toggle={showSideBar}/>
      <div className={showSideBar ? "page-content toggle-page-content": "page-content untoggle-page-content"}>
        {
          showMenu
            ? (<div className="avatar-menu">
          <a className="dropdown-item" href="#" onClick={
            handleClick
          }>logout</a>
              </div>): (null)
        }
     	  {routes.map((route, idx)=> <Route key={idx}  path={route.path} render={(props)=> <route.component isLoading = {isLoading} {...props} setIsLoading={setIsLoading} currentUser={user} stateHandler = {setUser}/>} />)}
           <Route path='/'>
            <Redirect  to="/home" />
          </Route>
          {user ? null: <Redirect path='/login' to='/login'/>}
    	  </div>
      </div>
      <footer>
        <small className="footer">copyrights reveresed @Qube</small>
      </footer>
      </div>
    </Router>
  )
}

export default withFirebase(App);
