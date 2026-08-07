import { useQuery } from "@tanstack/react-query";

import officerService from "../../services/officer.service";

import IssueList from "../../components/officer/IssueList";

const ResolvedIssues = () => {

  const {
    data: issues = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["resolved-issues"],

    queryFn: async () => {
      const response =
        await officerService.getResolvedIssues();

      return response.data.data;
    },
  });

  return (
    <IssueList
      title="Resolved Issues"
      subtitle="Completed public issues."
      issues={issues}
      isLoading={isLoading}
      isError={isError}
      emptyTitle="No Resolved Issues"
      emptyDescription="No issues have been resolved yet."
    />
  );
};

export default ResolvedIssues;