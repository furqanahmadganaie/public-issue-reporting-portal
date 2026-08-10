import { useState,useEffect } from "react";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import {
  FaCloudUploadAlt,
  FaImage,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

import officerService from "../../services/officer.service";

import getCurrentLocation from "../../utils/getCurrentLocation";

import LocationLoader from "../common/LocationLoader";

const InProgressAction = ({ issue }) => {

  const queryClient = useQueryClient();

  const [remark, setRemark] = useState("");

  const [status, setStatus] =
    useState("In Progress");

  const [images, setImages] = useState([]);

  const [previewImages, setPreviewImages] =
    useState([]);

  const handleImageChange = (e) => {

    const files = Array.from(
      e.target.files
    );

    setImages(files);

    setPreviewImages(

      files.map((file) => ({

        file,

        preview:
          URL.createObjectURL(file),

      }))

    );

  };

  const updateMutation = useMutation({

    mutationFn: async () => {

      if (!remark.trim()) {

        throw new Error(
          "Remark is required."
        );

      }

      const location =
        await getCurrentLocation();

      await officerService.updateStatus(

        issue.id,

        {

          status,

          remark,

          latitude:
            location.latitude,

          longitude:
            location.longitude,

        }

      );

      if (images.length > 0) {

        const formData =
          new FormData();

        images.forEach((image) => {

          formData.append(
            "images",
            image
          );

        });

        await officerService.uploadProgressImages(

          issue.id,

          formData

        );

      }

    },

    onSuccess: () => {

      toast.success(

        status === "Resolved"

          ? "Issue resolved successfully."

          : "Progress updated successfully."

      );

      queryClient.invalidateQueries({

        queryKey: [
          "officer-issue",
          issue.id,
        ],

      });

      queryClient.invalidateQueries({
        queryKey: [
          "assigned-issues",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "in-progress-issues",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "resolved-issues",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "officer-dashboard",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "timeline",
          issue.id,
        ],
      });

      setRemark("");

      setImages([]);

      previewImages.forEach((image) =>
        URL.revokeObjectURL(
          image.preview
        )
      );

      setPreviewImages([]);

    },

    onError: (error) => {

      toast.error(

        error.response?.data
          ?.message ||

          error.message ||

          "Failed to update issue."

      );

    },

  });

useEffect(() => {
  return () => {
    previewImages.forEach((image) => {
      URL.revokeObjectURL(image.preview);
    });
  };
}, [previewImages]);


  if (updateMutation.isPending) {

    return <LocationLoader />;

  }

  return (

    <div className="rounded-3xl border border-base-300 bg-base-200 p-8 shadow-lg">

      <div className="flex items-center gap-3">

        <FaCheckCircle
          className="text-primary text-2xl"
        />

        <div>

          <h2 className="text-2xl font-bold">
            Update Progress
          </h2>

          <p className="text-base-content/60">

            Update work progress,
            upload images and
            change issue status.

          </p>

        </div>

      </div>

      <div className="divider"></div>
            <div className="space-y-6">

        {/* Remark */}

        <div>

          <label className="label">

            <span className="label-text font-semibold">
              Progress Remark
            </span>

          </label>

          <textarea
            rows={5}
            className="textarea textarea-bordered w-full"
            placeholder="Describe today's work..."
            value={remark}
            onChange={(e) =>
              setRemark(e.target.value)
            }
          />

        </div>

        {/* Status */}

        <div>

          <label className="label">

            <span className="label-text font-semibold">
              Update Status
            </span>

          </label>

          <select
            className="select select-bordered w-full"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >

            <option value="In Progress">
              In Progress
            </option>

            <option value="Resolved">
              Resolved
            </option>

          </select>

        </div>

        {/* Upload */}

        <div>

          <label className="label">

            <span className="label-text font-semibold flex items-center gap-2">

              <FaImage />

              Progress Images

            </span>

          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
          />

          <label className="label">

            <span className="label-text-alt opacity-70">

              Upload one or more progress images.

            </span>

          </label>

        </div>

        {/* Preview */}

        {previewImages.length > 0 && (

          <div>

            <label className="label">

              <span className="label-text font-semibold">

                Image Preview

              </span>

            </label>

            <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

              {previewImages.map(
                (image, index) => (

                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >

                    <img
                      src={image.preview}
                      alt="Preview"
                      className="h-44 w-full object-cover"
                    />

                  </div>

                )
              )}

            </div>

          </div>

        )}
        {/* Current Status */}

        <div className="stats w-full border border-base-300 shadow">

          <div className="stat">

            <div className="stat-title">
              Current Status
            </div>

            <div className="stat-value text-primary text-2xl">
              {issue.status}
            </div>

            <div className="stat-desc">
              Current workflow stage
            </div>

          </div>

        </div>

        {/* GPS Information */}

        <div className="rounded-2xl border border-info/30 bg-info/10 p-5">

          <div className="flex gap-4">

            <FaMapMarkerAlt
              className="mt-1 text-2xl text-info"
            />

            <div>

              <h3 className="font-semibold text-lg">
                Live GPS Tracking
              </h3>

              <p className="mt-1 text-sm opacity-70 leading-6">

                Your live location will automatically be
                captured when you click
                <strong> Save Progress </strong>
                or
                <strong> Resolve Issue</strong>.

              </p>

            </div>

          </div>

        </div>

        {/* Tips */}

        <div className="rounded-2xl border border-success/20 bg-success/10 p-5">

          <h3 className="font-semibold mb-2">
            Before submitting
          </h3>

          <ul className="space-y-2 text-sm opacity-80 list-disc list-inside">

            <li>
              Add a meaningful progress remark.
            </li>

            <li>
              Upload clear images of completed work.
            </li>

            <li>
              Choose
              <strong> Resolved </strong>
              only after the issue has been fully fixed.
            </li>

          </ul>

        </div>

        {/* Buttons */}

        <div className="flex flex-wrap justify-end gap-4 pt-4">

          <button
            type="button"
            className="btn btn-outline rounded-2xl"
            onClick={() => {

              setRemark("");

              setImages([]);

              previewImages.forEach((image) =>
                URL.revokeObjectURL(image.preview)
              );

              setPreviewImages([]);

              setStatus("In Progress");

            }}
          >

            Reset

          </button>

          <button
            type="button"
            className={`btn rounded-2xl px-8 ${
              status === "Resolved"
                ? "btn-success"
                : "btn-primary"
            }`}
            disabled={updateMutation.isPending}
            onClick={() =>
              updateMutation.mutate()
            }
          >

            <FaCloudUploadAlt />

            {
              status === "Resolved"
                ? "Resolve Issue"
                : "Save Progress"
            }

          </button>

        </div>
            </div>

    </div>
  );
};

export default InProgressAction;