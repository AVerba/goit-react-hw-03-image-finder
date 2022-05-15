import styles from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ largeImg, onClose }) => {
  const KeyPressHandler = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const BackdropPressHandler = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', KeyPressHandler);

    return window.removeEventListener('keydown', KeyPressHandler);
  });

  return (
    <div className={styles.overlay} onClick={BackdropPressHandler}>
      <div className={styles.modal}>
        <img src={largeImg} alt="image" width="800" />
      </div>
    </div>
  );
};
export default Modal;
