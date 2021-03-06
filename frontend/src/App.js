import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import MainPage from './Pages/MainPage';
import AuthContext from './Context/auth-context';
import theme from './Themes/theme';
import AuthPage from './Pages/AuthPage';
import './App.css';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [image, setImage] = useState(null);
  const [groupId, setGroupId] = useState('5f32a0c7f2bae600a1bada92');

  const loginHandler = (uName, uId, uToken = null, img) => {
    setUsername(uName);
    setUserId(uId);
    setIsLogged(true);
    setToken(uToken);
    setImage(img);
  };

  const logoutHandler = () => {
    setIsLogged(false);
    setUsername(null);
    setUserId(null);
    setToken(null);
    setImage(null);
  };

  const groupHandler = (gid) => {
    setGroupId(gid);
  };

  let routes;
  if (isLogged) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <MainPage />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/auth' exact>
          <AuthPage />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider
        value={{
          isLogged,
          username,
          userId,
          token,
          image,
          groupId,
          login: loginHandler,
          logout: logoutHandler,
          setGroup: groupHandler,
        }}>
        <Router>{routes}</Router>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
