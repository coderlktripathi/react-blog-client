import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// Components
import NavBar from './components/Navbar';

// utils
import themeObject from './util/theme';

// pages
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';

const theme = createMuiTheme(themeObject)

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
