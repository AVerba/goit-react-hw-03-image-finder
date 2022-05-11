import { Component } from 'react';
import styles from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };
  searchSubmitHandler = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };
  changeNameHandler = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <div className={styles.Searchbar}>
        <form onSubmit={this.searchSubmitHandler} className={styles.SearchForm}>
          <button type="submit" className={styles.searchBtn}>
            <span className={styles.searchBtnLabel}>Search</span>
          </button>
          <input
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={styles.searchInput}
            value={this.state.searchQuery}
            onChange={this.changeNameHandler}
          />
        </form>
      </div>
    );
  }
}
