import ReactOnRails from 'react-on-rails';

import UserHordeApp from '../bundles/HelloWorld/components/UserHordeApp';

// This is how react_on_rails can see the UserHordeApp in the browser.
ReactOnRails.register({
  UserHordeApp,
});
