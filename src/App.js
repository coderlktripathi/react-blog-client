import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';

// Components
import NavBar from './components/Navbar';

// utils
import themeObject from './util/theme';
import AuthRoute from './util/AuthRoute';

// pages
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';

const theme = createMuiTheme(themeObject);

const loginData = localStorage.getItem('loginData');
let authenticated = false;

if(loginData) {
  const token = JSON.parse(loginData).token;
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href('/login');
    authenticated = false;
  } else {
    authenticated = true;
  }
  console.log(authenticated)
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} authenticated={authenticated}/>
            <AuthRoute exact path="/signup" component={SignUp} authenticated={authenticated}/>
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
