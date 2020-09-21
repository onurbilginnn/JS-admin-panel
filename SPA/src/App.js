import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './scss/style.scss';
import Spinner from './components/UI/Spinner/Spinner';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from './store/actions/index'


// Containers
const TheLayout = React.lazy(() => import('./hoc/Layout/TheLayout'));

// Pages
const Login = React.lazy(() => import('./containers/Auth/Login/Login'));
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));
const Page404 = React.lazy(() => import('./components/Errors/Page404/Page404'));
const Page500 = React.lazy(() => import('./components/Errors/Page500/Page500'));

const App = props => {
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(actions.authCheckState());
  }, [dispatch])

  let routes = (
    <Switch>
    <Route exact path="/logout" name="Logout" render={props => <Logout {...props} />} />
    <Route exact path="/login" name="Login" render={props => <Login {...props} />} />
    <Route exact path="/404" name="Error 404" render={props => <Page404 {...props} />} />
    <Route exact path="/500" name="Error 500" render={props => <Page500 {...props} />} />
    <Route path="/" name="Home" render={props => <TheLayout {...props} />} />
    <Redirect from='*' to='/404' />
  </Switch>
  )

  if (!isAuthenticated) {
    routes = (
      <Switch>
      <Route path="/login" name="Login" render={props => <Login {...props} />} />
      <Redirect to='/login' />
    </Switch>
    )
  }

  return (
    <React.Suspense fallback={<Spinner />}>
      {routes}
    </React.Suspense>
  );

}

export default App;
