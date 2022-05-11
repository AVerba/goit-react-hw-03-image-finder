import React, { Component } from 'react';
import { Searchbar } from './Searchbar';

export class App extends Component {
  state = {
    searchQuery: '',
  };
  formSubmitHandler = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.formSubmitHandler} />
      </div>
    );
  }
}
