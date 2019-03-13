import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Authorization from './components/Authorization/Authorization';
import Home from './components/Content/Home/Home';
import FullSong from './components/Content/FullSong/FullSong';
import Result from './components/Content/Search/Results/Results';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/signup" component={Authorization} />
            <Route path="/home" component={Home} />
            <Route path="/song/:id" exact component={FullSong} />
            <Route path="/search/:search" component={Result} />
            <Route path="/search/" exact component={Result} />
          </Switch>
         
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
