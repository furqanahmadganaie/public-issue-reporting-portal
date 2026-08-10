import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import officerService from "../../services/officer.service";
import getCurrentLocation from "../../utils/getCurrentLocation";
import LocationLoader from "../common/LocationLoader";

const AssignedAction = ({ issue }) => {
  const queryClient = useQueryClient();

  const [remark, setRemark] = useState("");

  const startWorkMutation = useMutation({
    mutationFn: async () => {
      if (!remark.trim()) {
        throw new Error("Remark is required.");
      }

      const location = await getCurrentLocation();

      return officerService.updateStatus(issue.id, {
        status: "In Progress",
        remark,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    },

    onSuccess: () => {
      toast.success("Work started successfully.");

      queryClient.invalidateQueries({
        queryKey: ["officer-issue", issue.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["assigned-issues"],
      });

      queryClient.invalidateQueries({
        queryKey: ["in-progress-issues"],
      });

      queryClient.invalidateQueries({
        queryKey: ["officer-dashboard"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to start work."
      );
    },
  });

  if (startWorkMutation.isPending) {
    return <LocationLoader />;
  }

  return (
    <div className="rounded-3xl border border-base-300 bg-base-200 p-8">

      <h2 className="text-2xl font-bold">
        Start Work
      </h2>

      <p className="mt-2 text-base-content/60">
        Add a remark before starting work.
        Your current GPS location will be captured automatically.
      </p>

      <div className="mt-6">

        <label className="label">
          <span className="label-text font-semibold">
            Remark
          </span>
        </label>

        <textarea
          rows={4}
          className="textarea textarea-bordered w-full"
          placeholder="Example: Team reached the location and inspection has started."
          value={remark}
          onChange={(e) =>
            setRemark(e.target.value)
          }
        />

      </div>

      <button
        className="btn btn-primary mt-6 rounded-2xl px-8"
        onClick={() =>
          startWorkMutation.mutate()
        }
      >
        Start Work
      </button>

    </div>
  );
};

export default AssignedAction;