import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaImage,
} from "react-icons/fa";
import ImageModal from "../common/ImageModal";

const ImageGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="btn btn-circle btn-sm shrink-0 border-slate-200 bg-white text-slate-500"
          onClick={() =>
            setSelectedIndex(images.length - 1)
          }
        >
          <FaChevronLeft />
        </button>

        <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.slice(0, 3).map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="group overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
            >
              <img
                src={image.image_url}
                alt="Issue"
                className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </button>
          ))}

          {images.length < 3 && (
            <div className="hidden h-36 items-center justify-center rounded-lg border border-dashed border-indigo-100 bg-indigo-50 text-indigo-300 sm:flex">
              <FaImage size={28} />
            </div>
          )}
        </div>

        <button
          type="button"
          className="btn btn-circle btn-sm shrink-0 border-slate-200 bg-white text-slate-500"
          onClick={() => setSelectedIndex(0)}
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className={`h-2 rounded-full transition ${
              index === 0
                ? "w-5 bg-indigo-600"
                : "w-2 bg-slate-300"
            }`}
            onClick={() => setSelectedIndex(index)}
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
