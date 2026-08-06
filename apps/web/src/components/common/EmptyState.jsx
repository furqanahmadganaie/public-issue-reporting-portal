import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body text-center">

        <h2 className="text-2xl font-bold">
          No Issues Found
        </h2>

        <p className="text-gray-500">
          You haven't reported any public issues yet.
        </p>

        <Link
          to="/report-issue"
          className="btn btn-primary mt-4"
        >
          Report Your First Issue
        </Link>

      </div>
    </div>
  );
};

export default EmptyState;