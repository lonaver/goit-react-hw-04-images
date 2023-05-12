import React, { useState, useEffect } from 'react';

import Loader from './Loader/Loader';
import { fetchPhoto } from './FetchPictures';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

import styles from './App.module.css';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState('');
  const [numberPage, setNumberPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (filter.trim() === '') return;
    const ApiFetshPhoto = async () => {
      try {
        setLoading(true);
        const itemPicture = await fetchPhoto(numberPage, filter);

        const arrayPitures = [...itemPicture.data.hits];
        setPhotos(prevPhoto => [...prevPhoto, ...arrayPitures]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    ApiFetshPhoto();
  }, [numberPage, filter]);

  const onAddMore = () => {
    setNumberPage(prevNumberPage => prevNumberPage + 1);
  };

  const onSubmit = e => {
    e.preventDefault();
    const wordForSearch = e.target.elements.search.value.trim();
    if (wordForSearch) {
      if (wordForSearch !== filter) {
        setFilter(wordForSearch);
        setNumberPage(1);
        setPhotos([]);
      }
    }
  };

  return (
    <div className={styles.App}>
      <SearchBar onSubmit={onSubmit}></SearchBar>
      {loading && <Loader></Loader>}
      {!loading && <ImageGallery photoList={photos}></ImageGallery>}
      {photos.length > 0 && !loading && <Button onClick={onAddMore}></Button>}
    </div>
  );
};
export default App;
