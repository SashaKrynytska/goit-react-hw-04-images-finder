import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, largeImageURL, tags }) => (
        <ImageGalleryItem key={id} src={largeImageURL} alt={tags} />
      ))}
    </ul>
  );
};

const imagesPropTypes = PropTypes.shape({
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
}).isRequired;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(imagesPropTypes),
};

export default ImageGallery;
