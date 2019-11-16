import React, { Component } from 'react';
import logo from './logo.png';
import {HashRouter, Route} from 'react-router-dom';
import Home from "./Content/Home";
import Register from "./Content/Register";
import Login from "./Content/Login";
import Menu from './Menu/Menu';
import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <header className="App-header">
            <h1 className="App-title">Zdravstveno informacioni sistem Srbije</h1>
            <Menu className="App-menu"/>
          </header>
          <p className="App-intro">
            <img src={logo} className="App-logo" alt="logo" />        
          </p>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
