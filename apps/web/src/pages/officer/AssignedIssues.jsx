import { useQuery } from "@tanstack/react-query";

import officerService from "../../services/officer.service";

import IssueList from "../../components/officer/IssueList";

const AssignedIssues = () => {

  const {
    data: issues = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["assigned-issues"],

    queryFn: async () => {
      const response =
        await officerService.getAssignedIssues();

      return response.data.data;
    },
  });

  return (
    <IssueList
      title="Assigned Issues"
      subtitle="Continue working on your assigned issues."
      issues={issues}
      isLoading={isLoading}
      isError={isError}
      emptyTitle="No Assigned Issues"
      emptyDescription="You don't have any assigned issues."
    />
  );
};

export default AssignedIssues;