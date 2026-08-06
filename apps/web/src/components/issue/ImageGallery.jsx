import { useState } from "react";
import ImageModal from "../common/ImageModal";

const ImageGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.image_url}
            alt="Issue"
            onClick={() => setSelectedIndex(index)}
            className="rounded-xl shadow-lg h-64 w-full object-cover cursor-pointer hover:scale-105 transition duration-300"
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <ImageModal
          images={images}
          currentIndex={selectedIndex}
          setCurrentIndex={setSelectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
};

export default ImageGallery;