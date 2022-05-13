import { Component } from 'react';
import { Notify } from 'notiflix';
import { ButtonLoad } from '../ui/Button';
import ImageLoader from '../ui/Loader/Loader';
import imagesAPI from '../../Services/serviceApi';

import styles from './ImageGallery.module.css';
import { Title } from '../ui/Title';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class ImageGallery extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    error: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const newQuery = this.props.searchQuery;
    const prevPage = prevState.currentPage;
    const newPage = this.state.currentPage;

    if (newQuery !== prevQuery) {
      return this.fetchImages(newQuery);
    } else {
      if (newPage !== prevPage) {
        return this.fetchImages(newQuery);
      }
    }
  }

  fetchImages(newQuery) {
    imagesAPI
      .fetchImages(newQuery, this.state.currentPage)
      .then(newImages => {
        const { hits } = newImages;
        // console.log(newImages);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          status: Status.RESOLVED,
        }));
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  }

  pageHandler = () => {
    this.setState(prevState => ({
      ...prevState,
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { error, status } = this.state;

    if (status === 'idle') {
      return (
        <Title
          className={styles.idleTitle}
          title="No search results yet. Please enter a request"
        />
      );
    }

    if (status === 'pending') {
      return <ImageLoader />;
    }

    if (status === 'rejected') {
      return Notify.warning(`${error.message}`);
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={styles.ImageGallery}>hello</ul>;
          <ButtonLoad title="Load more" onClick={this.pageHandler}></ButtonLoad>
        </>
      );
    }
  }
}
