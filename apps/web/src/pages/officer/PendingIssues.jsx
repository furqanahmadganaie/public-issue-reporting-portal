import { useQuery } from "@tanstack/react-query";

import officerService from "../../services/officer.service";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import PendingIssueCard from "../../components/officer/PendingIssueCard";

import PageLayout from "../../components/ui/PageLayout";
import PageHeader from "../../components/ui/PageHeader";

const PendingIssues = () => {
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