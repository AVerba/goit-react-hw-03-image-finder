import { Component } from 'react';
import { Notify } from 'notiflix';
import { ButtonLoad } from '../ui/Button';
import ImageLoader from '../ui/Loader/Loader';
import imagesAPI from '../../Services/serviceApi';

import styles from './ImageGallery.module.css';
import { Title } from '../ui/Title';
import { ImageGalleryItem } from './ImageGalleryItem';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class ImageGallery extends Component {
  state = {
    status: Status.IDLE,
    images: [],
    currentPage: 1,
    error: null,
    show: false,
    modalImageUrl: '',
    length: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const newQuery = this.props.searchQuery;

    if (newQuery !== prevQuery) {
      this.setState({
        images: [],
        currentPage: 1,
        error: null,
        status: Status.PENDING,
      });
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });

      return this.fetchImages(newQuery, this.state.currentPage);
    }
  }

  fetchImages(query, page) {
    console.log(query, page);
    imagesAPI
      .fetchImages(query, page)
      .then(({ hits }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          status: Status.RESOLVED,
          length: hits.length,
        }));
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  }

  pageHandler = event => {
    event.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      currentPage: prevState.currentPage + 1,
    }));
    this.fetchImages(this.props.searchQuery, this.state.currentPage);
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
      const { images } = this.state;
      console.log(images);
      return (
        <div className={styles.bodyContainer}>
          <ul className={styles.ImageGallery}>
            {images.map(({ id, tags, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                tags={tags}
                src={webformatURL}
                largeImageURL={largeImageURL}
              />
            ))}
          </ul>
          {this.state.length > 0 ? (
            <ButtonLoad
              className={styles.btnLoad}
              title="Load more"
              onClick={this.pageHandler}
            ></ButtonLoad>
          ) : (
            <Title
              className={styles.idleTitle}
              title="No more images for this request"
            />
          )}
        </div>
      );
    }
  }
}
