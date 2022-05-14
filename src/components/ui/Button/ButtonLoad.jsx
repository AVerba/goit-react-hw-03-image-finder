import styles from './Button.module.css';
import PropTypes from 'prop-types';

export const ButtonLoad = ({ title, onClick }) => {
  return (
    <div className={styles.buttotContainer}>
      <button type="button" onClick={onClick} className={styles.buttonLoad}>
        {title}
      </button>
    </div>
  );
};

ButtonLoad.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
