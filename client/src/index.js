import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { RestrictedPage } from './components/restrictedpage';
import LoginScreen from './screens/LoginScreen';
import SingInScreen from './screens/SingUpScreen';

export const history = createBrowserHistory();
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact={true} path="/login" component={LoginScreen} />
        <Route exact={true} path="/sign" component={SingInScreen} />
        <RestrictedPage Component={App} name="App" path={'/'} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
