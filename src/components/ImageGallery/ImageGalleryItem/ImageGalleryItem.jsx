import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  tags,
  src,
  largeImageURL,
  clickImageHandler,
}) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={src}
        alt={tags}
        className={styles.ItemImage}
        onClick={() => clickImageHandler(largeImageURL)}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  clickImageHandler: PropTypes.func,
};
