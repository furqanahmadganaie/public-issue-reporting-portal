import ImageUploader from "./ImageUploader";
import LocationPicker from "../common/LocationPicker";

const IssueForm = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  images,
  setImages,
  loading,
  setValue,
}) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="label">
          <span className="label-text">
            Title
          </span>
        </label>

        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter issue title"
          {...register("title", {
            required: "Title is required",
          })}
        />

        {errors.title && (
          <p className="text-error mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label className="label">
          <span className="label-text">
            Description
          </span>
        </label>

        <textarea
          rows={5}
          className="textarea textarea-bordered w-full"
          placeholder="Describe the issue..."
          {...register("description", {
            required: "Description is required",
          })}
        />

        {errors.description && (
          <p className="text-error mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="label">
            <span className="label-text">
              Village
            </span>
          </label>

          <input
            type="text"
            className="input input-bordered w-full"
            {...register("village", {
              required: "Village is required",
            })}
          />

          {errors.village && (
            <p className="text-error mt-1">
              {errors.village.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text">
              Address
            </span>
          </label>

          <input
            type="text"
            className="input input-bordered w-full"
            {...register("address", {
              required: "Address is required",
            })}
          />

          {errors.address && (
            <p className="text-error mt-1">
              {errors.address.message}
            </p>
          )}
        </div>
      </div>

      {/* <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="label">
            <span className="label-text">
              Latitude
            </span>
          </label>

          <input
            type="number"
            step="any"
            className="input input-bordered w-full"
            {...register("latitude", {
              required: "Latitude is required",
            })}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">
              Longitude
            </span>
          </label>

          <input
            type="number"
            step="any"
            className="input input-bordered w-full"
            {...register("longitude", {
              required: "Longitude is required",
            })}
          />
        </div>
      </div> */}

       <div>

  <label className="label">
    <span className="label-text">
      Issue Location
    </span>
  </label>

  <LocationPicker
    setValue={setValue}
  />

</div>  

      <ImageUploader
        images={images}
        setImages={setImages}
      />

     <input
  type="hidden"
  {...register("latitude", {
    required: true,
  })}
/>

<input
  type="hidden"
  {...register("longitude", {
    required: true,
  })}
/>


      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading
          ? "Submitting..."
          : "Submit Issue"}
      </button>
    </form>
  );
};

export default IssueForm;