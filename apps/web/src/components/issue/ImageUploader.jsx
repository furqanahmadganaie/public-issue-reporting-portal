import { useRef } from "react";
import {
  FaCloudUploadAlt,
  FaTrash,
} from "react-icons/fa";

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
    <div>

      <label className="mb-1 block">
        <span className="text-sm font-bold text-slate-700">
          Upload Images{" "}
          <span className="text-slate-400">(Optional)</span>
        </span>
      </label>
      <p className="mb-1 text-xs font-semibold text-slate-400">
        Add photos related to the issue. Max 5 images.
      </p>

      <button
        type="button"
        className="flex min-h-20 w-full flex-col items-center justify-center rounded-lg border border-dashed border-indigo-300 bg-indigo-50/30 px-4 text-center transition hover:bg-indigo-50"
        onClick={() => fileInputRef.current?.click()}
      >
        <span className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
          <FaCloudUploadAlt size={16} />
        </span>
        <span className="text-xs font-bold text-slate-700">
          Drag and drop images here or
        </span>
        <span className="btn mt-1 min-h-7 rounded-lg border-0 bg-indigo-600 px-4 text-xs font-bold text-white hover:bg-indigo-700">
          Choose Files
        </span>
        <span className="mt-1 text-[11px] font-semibold text-slate-400">
          JPG, PNG up to 5MB each
        </span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {images.length > 0 && (
        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">

          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="h-20 w-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="btn btn-circle btn-error btn-xs absolute right-2 top-2"
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
