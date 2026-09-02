import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeft } from "react-icons/fa";

import officerService from "../../services/officer.service";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import TimelineItem from "../../components/officer/TimelineItem";

const OfficerTimeline = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: timeline = [],
    isLoading,
    isError,
  } = useQuery({

    queryKey: ["timeline", id],

    queryFn: async () => {

      const response =
        await officerService.getTimeline(id);

      return response.data.data;

    },

  });

  const backButton = (
    <button
      className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800"
      onClick={() => navigate(-1)}
      type="button"
    >
      <FaArrowLeft size={12} />
      Back
    </button>
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {

    return (

      <div className="min-h-screen bg-base-200 px-10 py-8">

        {backButton}

        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="alert alert-error shadow-lg">

            Failed to load issue timeline.

          </div>
        </div>

      </div>

    );

  }

  if (timeline.length === 0) {

    return (

      <div className="min-h-screen bg-base-200 px-10 py-8">
        {backButton}

        <EmptyState
          title="No Timeline Available"
          description="No updates have been recorded for this issue yet."
        />
      </div>

    );

  }

  return (

    <div className="min-h-screen bg-base-200 px-10 py-8">

      {backButton}

      {/* Header */}

      <div className="mb-12">

        <h1 className="text-5xl font-extrabold">

          Issue Timeline

        </h1>

        <p className="mt-3 text-lg text-base-content/60">

          Complete history of this issue from acceptance
          to final resolution.

        </p>

      </div>

      {/* Timeline */}

      <div className="relative">

        {/* Vertical Line */}

        <div className="absolute left-8 top-0 bottom-0 w-1 rounded-full bg-primary/30" />

        <div className="space-y-10">

          {timeline.map((item) => (

            <TimelineItem
              key={item.id}
              item={item}
            />

          ))}

        </div>

      </div>

    </div>

  );

};

export default OfficerTimeline;
