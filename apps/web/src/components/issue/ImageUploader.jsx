import { useRef } from "react";
import { FaTrash } from "react-icons/fa";

const ImageUploader = ({ images, setImages }) => {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (images.length + selectedFiles.length > 5) {
      alert("Maximum 5 images are allowed.");
      return;
    }

    setImages((prev) => [...prev, ...selectedFiles]);

    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">

      <label className="label">
        <span className="label-text font-medium">
          Upload Images
        </span>
      </label>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="file-input file-input-bordered w-full"
        onChange={handleImageChange}
      />

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

          {images.map((image, index) => (
            <div
              key={index}
              className="relative"
            >
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="rounded-lg h-32 w-full object-cover border"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="btn btn-circle btn-error btn-xs absolute top-2 right-2"
              >
                <FaTrash />
              </button>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default ImageUploader;