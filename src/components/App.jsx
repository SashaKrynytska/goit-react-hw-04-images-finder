import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery';
import Button from './Button';
import SearchBar from './SearchBar';
import Loader from './Loader';
import Modal from './Modal';
import fetchImages from '../galleryAPI';
import css from './App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState('');

  const getImages = async () => {
    setIsLoading(true);

    try {
      const response = await fetchImages(query, page);

      const dataImages = response.hits.map(({ id, tags, largeImageURL }) => ({
        id,
        tags,
        largeImageURL,
      }));

      setImages(prevImages => [...prevImages, ...dataImages]);
      setTotalImages(prevTotalImages => response.totalHits);
      setError('');

      if (page !== 1) {
        scrollOnLoadButton();
      }
    } catch (error) {
      console.log('Something wrong... Try again!');
      setError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!query) return;
    console.log(query);
    console.log(page);
    getImages();
  }, [query, page]);

  const onChangeQuery = query => {
    setImages([]);
    setPage(1);
    setQuery(query);
    setTotalImages(0);
  };

  const handleGalleryItem = largeImageURL => {
    setLargeImage(largeImageURL);
    setShowModal(true);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
    setLargeImage(largeImage);
  };

  const showLoadMore = images.length !== totalImages && !isLoading;

  return (
    <div className={css.App}>
      <SearchBar onSubmit={onChangeQuery} />
      {images.length < 1 && <h2>The gallery is empty - use Search!</h2>}
      {images.length > 1 && (
        <ImageGallery images={images} onClick={handleGalleryItem} />
      )}
      {isLoading && <Loader />}
      {showModal && <Modal onClose={toggleModal} />}
      {showLoadMore && <Button onClick={loadMore} />}
    </div>
  );
};
