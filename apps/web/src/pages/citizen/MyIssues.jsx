import { useQuery } from "@tanstack/react-query";

import issueService from "../../services/issue.service";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import IssueCard from "../../components/issue/IssueCard";

const MyIssues = () => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myIssues"],
    queryFn: async () => {
      const response =
        await issueService.getMyIssues();

      return response.data.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="alert alert-error max-w-xl mx-auto mt-10">
        <span>
          {error.response?.data?.message ||
            "Something went wrong."}
        </span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            My Issues
          </h1>

          <p className="text-gray-500">
            Total Issues : {data.length}
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {data.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
            />
          ))}

        </div>

      </div>

    </div>
  );
};

export default MyIssues;