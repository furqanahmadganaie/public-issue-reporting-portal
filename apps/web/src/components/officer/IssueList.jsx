import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import PageHeader from "../ui/PageHeader";
import PageLayout from "../ui/PageLayout";
import AssignedIssueCard from "./AssignedIssueCard";

const IssueList = ({
  title,
  subtitle,
  issues,
  isLoading,
  isError,
  emptyTitle,
  emptyDescription,
}) => {
  const navigate = useNavigate();

  const backButton = (
    <button
      className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800"
      onClick={() => navigate("/officer/dashboard")}
      type="button"
    >
      <FaArrowLeft size={12} />
      Back to Dashboard
    </button>
  );

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <PageLayout>
        {backButton}
        <div className="alert alert-error shadow-lg">
          Failed to load issues.
        </div>
      </PageLayout>
    );
  }

  if (issues.length === 0) {
    return (
      <PageLayout>
        {backButton}
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout>

      {backButton}

      <PageHeader
        title={title}
        subtitle={subtitle}
      />

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {issues.map((issue) => (
          <AssignedIssueCard
            key={issue.id}
            issue={issue}
          />
        ))}

      </div>

    </PageLayout>
  );
};

export default IssueList;
