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
    if (newQuery === prevQuery) {
      return Notify.warning(`Please enter name of some images`);
    }
    imagesAPI
      .fetchImages(newQuery, this.state.currentPage)
      .then(newImages => {
        const { hits } = newImages;
        // console.log(newImages);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
          status: Status.RESOLVED,
        }));
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
    // this.setState({ searchQuery: newQuery });
    //
    // this.fetchImages();
  }

  fetchImages = () => {
    console.log('newQuery');
    imagesAPI
      .fetchImages(this.state.searchQuery)
      .then(({ hits }) => {
        // const { hits } = newImages;
        // console.log(hits);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
          status: Status.RESOLVED,
        }));
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
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
          <ButtonLoad title="Load more" onClick={this.fetchImages}></ButtonLoad>
        </>
      );
    }
  }
}
