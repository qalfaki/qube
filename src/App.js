import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Navigation from './components/navigation.js';
import routes from './routes';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
     {routes.map(route=> <Route {...route} />)}

    </div>
    </Router>
  );
}

export default App;
