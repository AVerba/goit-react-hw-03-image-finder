import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ tags, src, largeImageURL, imageHandle }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={src}
        alt={tags}
        className={styles.ItemImage}
        onClick={imageHandle(largeImageURL)}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  imageHandle: PropTypes.func.isRequired,
};
