import { Link } from "react-router-dom";

import StatusBadge from "./StatusBadge";

const IssueCard = ({ issue }) => {
  return (
    <div className="card bg-base-100 shadow-xl">

      {issue.image_url && (
        <figure className="h-52">
          <img
            src={issue.image_url}
            alt={issue.title}
            className="w-full h-full object-cover"
          />
        </figure>
      )}

      <div className="card-body">

        <div className="flex justify-between items-center">

          <h2 className="card-title">
            {issue.title}
          </h2>

          <StatusBadge status={issue.status} />

        </div>

        <p>
          <strong>Village:</strong>{" "}
          {issue.village}
        </p>

        <p>
          <strong>Priority:</strong>{" "}
          {issue.priority}
        </p>

        <p className="text-sm text-gray-500">
          {new Date(
            issue.created_at
          ).toLocaleDateString()}
        </p>

        <div className="card-actions justify-end">

          <Link
            to={`/issues/${issue.id}`}
            className="btn btn-primary"
          >
            View Details
          </Link>

        </div>

      </div>

    </div>
  );
};

export default IssueCard;