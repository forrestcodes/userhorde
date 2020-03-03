import '@babel/polyfill';
import 'es5-shim';

import ReactOnRails from 'react-on-rails';
import HelloWorld from '../components/HelloWorld'

ReactOnRails.setOptions({
});

ReactOnRails.register({
  HelloWorld
});