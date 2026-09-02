import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import officerService from "../../services/officer.service";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import PendingIssueCard from "../../components/officer/PendingIssueCard";

import PageLayout from "../../components/ui/PageLayout";
import PageHeader from "../../components/ui/PageHeader";

const PendingIssues = () => {
  const navigate = useNavigate();

  const {
    data: issues = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pending-issues"],

    queryFn: async () => {
      const response =
        await officerService.getPendingIssues();

      return response.data.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <PageLayout>
        <button
          className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800"
          onClick={() => navigate("/officer/dashboard")}
          type="button"
        >
          <FaArrowLeft size={12} />
          Back to Dashboard
        </button>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="alert alert-error shadow-lg max-w-md">
            <span>Failed to load pending issues.</span>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (issues.length === 0) {
    return (
      <PageLayout>
        <button
          className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800"
          onClick={() => navigate("/officer/dashboard")}
          type="button"
        >
          <FaArrowLeft size={12} />
          Back to Dashboard
        </button>
        <div className="flex justify-center items-center min-h-[60vh]">
          <EmptyState
            title="No Pending Issues"
            description="There are currently no issues waiting for assignment."
          />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>

      <button
        className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800"
        onClick={() => navigate("/officer/dashboard")}
        type="button"
      >
        <FaArrowLeft size={12} />
        Back to Dashboard
      </button>

      <PageHeader
        title="Pending Issues"
        subtitle="Review newly reported issues and accept responsibility for resolving them."
      />

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

        {issues.map((issue) => (
          <PendingIssueCard
            key={issue.id}
            issue={issue}
          />
        ))}

      </div>

    </PageLayout>
  );
};

export default PendingIssues;
