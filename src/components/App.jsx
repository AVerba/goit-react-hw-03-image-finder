import React, { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

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
        <ImageGallery searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}
