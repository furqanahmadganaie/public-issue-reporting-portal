import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import officerService from "../../services/officer.service";
import getCurrentLocation from "../../utils/getCurrentLocation";
import LocationLoader from "../common/LocationLoader";

const PendingAction = ({ issue }) => {
  const queryClient = useQueryClient();

  const acceptMutation = useMutation({
    mutationFn: async () => {
      const location = await getCurrentLocation();

      return officerService.acceptIssue(issue.id, {
        remark: "Issue accepted.",

        latitude: location.latitude,

        longitude: location.longitude,
      });
    },

    onSuccess: () => {
      toast.success("Issue accepted successfully.");

      queryClient.invalidateQueries({
        queryKey: ["officer-issue", issue.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["pending-issues"],
      });

      queryClient.invalidateQueries({
        queryKey: ["assigned-issues"],
      });

      queryClient.invalidateQueries({
        queryKey: ["officer-dashboard"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to accept issue."
      );
    },
  });

  if (acceptMutation.isPending) {
    return <LocationLoader />;
  }

  return (
    <div className="rounded-3xl border border-base-300 bg-base-200 p-8">

      <h2 className="text-2xl font-bold">
        Officer Action
      </h2>

      <p className="mt-2 text-base-content/60">
        Accept this issue to begin working on it.
        Your GPS location will be captured automatically.
      </p>

      <button
        className="btn btn-primary mt-6 rounded-2xl px-8"
        onClick={() => acceptMutation.mutate()}
      >
        Accept Issue
      </button>

    </div>
  );
};

export default PendingAction;