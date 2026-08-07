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
  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <PageLayout>
        <div className="alert alert-error shadow-lg">
          Failed to load issues.
        </div>
      </PageLayout>
    );
  }

  if (issues.length === 0) {
    return (
      <PageLayout>
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout>

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