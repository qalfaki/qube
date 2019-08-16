import {Todo, Goals, Home, Login, Signup, Reset} from './components';
const routes = [
  {
	path: '/to-dos',
	component: Todo
  },
  {
	path: '/goals',
	component: Goals
  },
  {
	path: '/home',
	component: Home

  },
  {
	path: '/',
	component: Login,
	exect: true
  },
  {
	path: '/signup',
	component: Signup
  },
  {
	path: '/reset',
	component: Reset
  }]

export default routes;