import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import officerService from "../../services/officer.service";

import Loader from "../../components/common/Loader";
import Map from "../../components/common/Map";

import StatusBadge from "../../components/issue/StatusBadge";
import ImageGallery from "../../components/issue/ImageGallery";

import OfficerActionPanel from "../../components/officer/OfficerActionPanel";

const OfficerIssueDetails = () => {
  const { id } = useParams();

  const {
    data: issue,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["officer-issue", id],

    queryFn: async () => {
      const response =
        await officerService.getIssueDetails(id);

      return response.data.data;
    },
  });

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error shadow-lg">
          Failed to load issue.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 px-10 py-8">

      <div className="card bg-base-100 shadow-xl">

        <div className="card-body">

          {/* Header */}

          <div className="flex items-center justify-between">

            <h1 className="text-4xl font-bold">
              {issue.title}
            </h1>

            <StatusBadge status={issue.status} />

          </div>

          <div className="divider"></div>

          {/* Images */}

          <ImageGallery images={issue.images} />

          <div className="divider"></div>

          {/* Description */}

          <div>

            <h2 className="text-xl font-bold mb-2">
              Description
            </h2>

            <p>{issue.description}</p>

          </div>

          {/* Details */}

          <div className="grid gap-6 mt-8 md:grid-cols-2">

            <div>
              <h3 className="font-semibold">
                Village
              </h3>

              <p>{issue.village}</p>
            </div>

            <div>
              <h3 className="font-semibold">
                Address
              </h3>

              <p>{issue.address}</p>
            </div>

            <div>
              <h3 className="font-semibold">
                Priority
              </h3>

              <p>{issue.priority}</p>
            </div>

            <div>
              <h3 className="font-semibold">
                Reported On
              </h3>

              <p>
                {new Date(
                  issue.created_at
                ).toLocaleString()}
              </p>
            </div>

          </div>

          <div className="divider"></div>

          {/* Map */}

          <h2 className="text-xl font-bold mb-4">
            Issue Location
          </h2>

          <Map
            latitude={issue.latitude}
            longitude={issue.longitude}
          />

          <div className="divider"></div>

          {/* Dynamic Officer Actions */}

          <OfficerActionPanel issue={issue} />

        </div>

      </div>

    </div>
  );
};

export default OfficerIssueDetails;