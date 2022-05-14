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
    searchQuery: this.props.searchQuery,
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
      this.setState({
        // searchQuery: newQuery,
        // images: [],
        // currentPage: 1,
        // error: null,
        status: Status.PENDING,
      });

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
      return this.fetchImages(newQuery, this.state.currentPage);
    } else {
      if (newPage !== prevPage) {
        this.setState({ status: Status.PENDING });
        return this.fetchImages(newQuery, this.state.currentPage);
      }
    }
  }

  fetchImages(query, page) {
    console.log(query, page);
    imagesAPI
      .fetchImages(query, page)
      .then(data => {
        const { hits } = data;
        console.log(data.hits);
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
      const { images } = this.state;
      console.log(images);
      return (
        <>
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
          ;
          <ButtonLoad title="Load more" onClick={this.pageHandler}></ButtonLoad>
        </>
      );
    }
  }
}
