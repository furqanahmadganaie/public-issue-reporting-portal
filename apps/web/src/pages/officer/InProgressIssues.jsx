import { useQuery } from "@tanstack/react-query";

import officerService from "../../services/officer.service";

import IssueList from "../../components/officer/IssueList";

const InProgressIssues = () => {

  const {
    data: issues = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["in-progress-issues"],

    queryFn: async () => {
      const response =
        await officerService.getInProgressIssues();

      return response.data.data;
    },
  });

  return (
    <IssueList
      title="In Progress"
      subtitle="Issues currently being worked on."
      issues={issues}
      isLoading={isLoading}
      isError={isError}
      emptyTitle="No Active Work"
      emptyDescription="There are no issues in progress."
    />
  );
};

export default InProgressIssues;