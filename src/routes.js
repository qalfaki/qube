import {Todo, Goals, Home, Login, Signup, Reset, Archive} from './components';
const routes = [
  {
	path: '/to-do',
	component: Todo
  },
  {
	path: '/goals',
	component: Goals
  },
  {
	path: '/home',
	component: Home,
	exect: true
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
  	component: Archive
  }]

export default routes;