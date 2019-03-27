import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import { BrowserRouter, Route, Redirect, Switch, } from 'react-router-dom';
import Home from './components/Content/Home/Home';
import FullSong from './components/Content/FullSong/FullSong';
import Result from './components/Content/Search/Results/Results';
import Profile from './components/Content/Profile/Profile';
import Login from './components/Authorization/Signup/Login';
import Register from './components/Authorization/Signup/Register';
import Settings from './components/Content/Profile/Settings/Settings';


class App extends Component {
  render() {

    const PrivateRoute = ({ component: Component, ...rest}) => (
      <Route {...rest} render={(props) => (
        sessionStorage.getItem('token') !== null
         ? <Component {...props} />
          : <Redirect to="/login" />
      )}
       />
    )
    
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
            <Route path="/song/:id" exact component={FullSong} />
            <Route path="/search/:search" component={Result} />
            <Route path="/search/" exact component={Result} />
            <PrivateRoute path="/profile/settings" component={Settings} /> 
            <PrivateRoute path="/profile/" component={Profile} /> 
          </Switch>
         
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
