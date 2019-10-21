import React, { Component } from 'react';
import Posts from './components/Posts';
import Header from './components/Header';
import Tachyons from 'tachyons/css/tachyons.min.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="bg-near-white">
        <Header
          img="https://pbs.twimg.com/profile_images/660000431532208128/weHW9nQj_400x400.jpg"
          username="Amogh Meshram"
        />
        <Posts/>
      </div >
    );
  }
}

export default App;
