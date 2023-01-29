import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ src, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => setIsModalOpen(!isModalOpen);

  return (
    <li className={css.ImageGalleryItem}>
      {isModalOpen && <Modal onClose={handleClick} src={src} alt={tags} />}
      <img
        className={css['ImageGalleryItem-image']}
        src={src}
        alt={tags}
        onClick={handleClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
