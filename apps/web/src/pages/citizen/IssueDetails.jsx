import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import issueService from "../../services/issue.service";

import Loader from "../../components/common/Loader";
import StatusBadge from "../../components/issue/StatusBadge";
import Map from "../../components/common/Map";
import ImageGallery from "../../components/issue/ImageGallery";
const IssueDetails = () => {
  const { id } = useParams();

  const {
    data: issue,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      const response = await issueService.getIssueById(id);
      return response.data.data;
    },
  });

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="alert alert-error max-w-xl mx-auto mt-10">
        <span>
          {error.response?.data?.message ||
            "Failed to load issue."}
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-6xl mx-auto px-4">

        <div className="card bg-base-100 shadow-xl">

          <div className="card-body">

            {/* Header */}
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">
                {issue.title}
              </h1>

              <StatusBadge status={issue.status} />
            </div>

            <div className="divider"></div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Description
              </h2>

              <p>{issue.description}</p>
            </div>

            <div className="divider"></div>

            {/* Issue Information */}
            <h2 className="text-2xl font-semibold mb-4">
              Issue Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <p className="font-semibold">
                  Village
                </p>

                <p>{issue.village}</p>
              </div>

              <div>
                <p className="font-semibold">
                  Address
                </p>

                <p>{issue.address}</p>
              </div>

              <div>
                <p className="font-semibold">
                  Priority
                </p>

                <p>{issue.priority}</p>
              </div>

              <div>
                <p className="font-semibold">
                  Reported On
                </p>

                <p>
                  {new Date(
                    issue.created_at
                  ).toLocaleString()}
                </p>
              </div>

            </div>

            <div className="divider"></div>

            {/* Map */}
            <h2 className="text-2xl font-semibold mb-4">
              Issue Location
            </h2>

            <Map
              latitude={issue.latitude}
              longitude={issue.longitude}
            />

            <div className="divider"></div>

            {/* Images */}
            <h2 className="text-2xl font-semibold mb-4">
              Uploaded Images
            </h2>

            {issue.images.length > 0 ? (
              <ImageGallery images={issue.images} />
            ) : (
              <p>No images uploaded.</p>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default IssueDetails;