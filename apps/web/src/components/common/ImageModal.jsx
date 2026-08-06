import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImageModal = ({
  images,
  currentIndex,
  setCurrentIndex,
  onClose,
}) => {
  const previousImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
   <div
  className="fixed inset-0 bg-black/90 z-[9999] flex justify-center items-center"
  onClick={onClose}
>
      <button
        className="absolute top-6 right-6 btn btn-circle btn-error"
        onClick={onClose}
      >
        <FaTimes />
      </button>

      {images.length > 1 && (
        <button
          className="absolute left-6 btn btn-circle"
          onClick={(e) => {
            e.stopPropagation();
            previousImage();
          }}
        >
          <FaChevronLeft />
        </button>
      )}

      <img
        src={images[currentIndex].image_url}
        alt="Issue"
        className="max-h-[90vh] max-w-[90vw] rounded-xl"
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <button
          className="absolute right-6 btn btn-circle"
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
        >
          <FaChevronRight />
        </button>
      )}

      <div className="absolute bottom-6 text-white text-lg font-semibold">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageModal;