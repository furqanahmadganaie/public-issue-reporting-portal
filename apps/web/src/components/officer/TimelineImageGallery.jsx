import { useState } from "react";
import { FaExpand } from "react-icons/fa";

const TimelineImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] =
    useState(null);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {images.map((image) => (

          <div
            key={image.id}
            className="group relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]"
          >

            <img
              src={image.image_url}
              alt="Progress"
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">

              <button
                onClick={() =>
                  setSelectedImage(
                    image.image_url
                  )
                }
                className="btn btn-circle btn-primary scale-0 transition-all duration-300 group-hover:scale-100"
              >
                <FaExpand />
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* Image Preview */}

      {selectedImage && (

        <dialog
          className="modal modal-open"
        >

          <div className="modal-box max-w-6xl bg-transparent shadow-none">

            <img
              src={selectedImage}
              alt="Preview"
              className="max-h-[85vh] w-full rounded-3xl object-contain"
            />

          </div>

          <form
            method="dialog"
            className="modal-backdrop"
          >

            <button
              onClick={() =>
                setSelectedImage(null)
              }
            >
              close
            </button>

          </form>

        </dialog>

      )}

    </>
  );
};

export default TimelineImageGallery;