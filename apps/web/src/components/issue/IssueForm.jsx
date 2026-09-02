import ImageUploader from "./ImageUploader";
import LocationPicker from "../common/LocationPicker";

const FieldError = ({ message }) => {
  if (!message) return null;

  return (
    <p className="mt-2 text-xs font-semibold text-rose-600">
      {message}
    </p>
  );
};

const IssueForm = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  images,
  setImages,
  loading,
  setValue,
  onCancel,
}) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-3 xl:grid-cols-[1fr_0.9fr]"
    >
      <div className="space-y-2">
        <div>
        <label className="mb-1 block">
          <span className="text-sm font-bold text-slate-700">
            Title <span className="text-rose-500">*</span>
          </span>
        </label>

        <input
          type="text"
          className="input min-h-9 w-full rounded-lg border-slate-200 bg-white text-sm text-slate-950 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
          placeholder="Enter issue title (e.g. Water leakage on road)"
          {...register("title", {
            required: "Title is required",
          })}
        />

        <p className="mt-1 text-xs font-semibold text-slate-400">
          Maximum 100 characters
        </p>

        <FieldError message={errors.title?.message} />
      </div>

      <div>
        <label className="mb-1 block">
          <span className="text-sm font-bold text-slate-700">
            Description <span className="text-rose-500">*</span>
          </span>
        </label>

        <textarea
          rows={2}
          className="textarea min-h-20 w-full rounded-lg border-slate-200 bg-white text-sm text-slate-950 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
          placeholder="Describe the issue in detail..."
          {...register("description", {
            required: "Description is required",
          })}
        />

        <p className="mt-1 text-xs font-semibold text-slate-400">
          Minimum 50 characters
        </p>

        <FieldError message={errors.description?.message} />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block">
            <span className="text-sm font-bold text-slate-700">
              Village / Area <span className="text-rose-500">*</span>
            </span>
          </label>

          <input
            type="text"
            className="input min-h-9 w-full rounded-lg border-slate-200 bg-white text-sm text-slate-950 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
            placeholder="Select village / area"
            {...register("village", {
              required: "Village is required",
            })}
          />

          <FieldError message={errors.village?.message} />
        </div>

        <div>
          <label className="mb-1 block">
            <span className="text-sm font-bold text-slate-700">
              Address <span className="text-rose-500">*</span>
            </span>
          </label>

          <input
            type="text"
            className="input min-h-9 w-full rounded-lg border-slate-200 bg-white text-sm text-slate-950 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
            placeholder="Enter full address"
            {...register("address", {
              required: "Address is required",
            })}
          />

          <FieldError message={errors.address?.message} />
        </div>
      </div>
      </div>

      <div className="space-y-2">
      <div>
        <label className="mb-1 block">
          <span className="text-sm font-bold text-slate-700">
            Issue Location <span className="text-rose-500">*</span>
          </span>
        </label>
        <p className="mb-1 text-xs font-semibold text-slate-400">
          Drag the marker to the exact location of the issue.
        </p>

        <LocationPicker
          setValue={setValue}
        />
      </div>

      <ImageUploader
        images={images}
        setImages={setImages}
      />
      </div>

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

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between xl:col-span-2">
        <button
          type="button"
          className="btn min-h-9 rounded-lg border border-slate-200 bg-white px-5 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn min-h-9 rounded-lg border-0 bg-indigo-600 px-6 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700"
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : "Submit Issue"}
        </button>
      </div>
    </form>
  );
};

export default IssueForm;
