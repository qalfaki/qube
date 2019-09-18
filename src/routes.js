import {Todo, Goals, Home, Login, Signup, Reset, Archive} from './components';
export default [
  {
	  path: '/to-do',
	  component: Todo
  },
  {
	  path: '/goals',
	  component: Goals
  },
  {
	  path: '/',
	  component: Home
  },
  {
	  path: '/login',
	  component: Login
  },
  {
	  path: '/signup',
	  component: Signup
  },
  {
	  path: '/reset',
	  component: Reset
  },
  {
    path: '/archive',
    component: Archive,
  }
];