import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';
import styles from './ImageGalleryItem.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

const ImageGalleryItem = ({ url, alt, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = e => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <li className={styles['ImageGalleryItem']}>
      <div className={styles['gallery__link']} onClick={openModal}>
        <img className={styles['ImageGalleryItem-image']} src={url} alt={alt} />
      </div>
      {showModal && (
        <Modal
          src={largeImageURL}
          alt={alt}
          onClose={handleBackDropClick}
        ></Modal>
      )}
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
