import React from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

const Module = ({ src, alt, onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

export default Module;

Module.propTypes = {
  onClose: PropTypes.func,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
