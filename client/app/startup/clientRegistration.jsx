import '@babel/polyfill';
import 'es5-shim';

import ReactOnRails from 'react-on-rails';
import UserHordeApp from '../components/UserHordeApp'
import LoginApp from '../components/sessions/LoginApp'
import LoginForm from '../components/sessions/LoginForm'
import NavBar from '../components/shared/NavBar'

import '../assets/styles/application.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactOnRails.setOptions({
});

ReactOnRails.register({
  UserHordeApp: UserHordeApp,
  LoginApp: LoginApp,
  LoginForm: LoginForm,
  NavBar: NavBar
});