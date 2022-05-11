import React, { Component } from 'react';
import { Searchbar } from './Searchbar';

export class App extends Component {
  state = {
    query: '',
  };

  render() {
    return (
      <div>
        <Searchbar />
      </div>
    );
  }
}
