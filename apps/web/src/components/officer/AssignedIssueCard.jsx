import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTools,
} from "react-icons/fa";

import StatusBadge from "../issue/StatusBadge";

const AssignedIssueCard = ({ issue }) => {
  return (
    <div className="group overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]">

      <figure className="relative h-64 overflow-hidden">

        <img
          src={
            issue.image_url ||
            "https://placehold.co/600x400?text=No+Image"
          }
          alt={issue.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-4 right-4">
          <StatusBadge status={issue.status} />
        </div>

      </figure>

      <div className="space-y-5 p-6">

        <div>
          <h2 className="text-2xl font-bold line-clamp-1">
            {issue.title}
          </h2>

          <p className="text-sm text-base-content/60 mt-2">
            Assigned public issue
          </p>
        </div>

        <div className="space-y-3">

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-primary" />
            <span>{issue.village}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaTools className="text-info" />
            <span>{issue.status}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-success" />
            <span>
              {new Date(issue.created_at).toLocaleDateString()}
            </span>
          </div>

        </div>

        <Link
          to={`/officer/issues/${issue.id}`}
          className="btn btn-primary btn-block rounded-2xl"
        >
          Continue Work

          <FaArrowRight />
        </Link>

      </div>

    </div>
  );
};

export default AssignedIssueCard;