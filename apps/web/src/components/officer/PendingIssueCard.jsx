import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaFlag,
} from "react-icons/fa";

import StatusBadge from "../issue/StatusBadge";

const PendingIssueCard = ({ issue }) => {
  return (
    <div className="group overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary hover:shadow-[0_0_35px_rgba(99,102,241,0.35)]">

      {/* Image */}
      <figure className="relative h-64 overflow-hidden">

        <img
          src={
            issue.image_url ||
            "https://placehold.co/600x400?text=No+Image"
          }
          alt={issue.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Status */}
        <div className="absolute top-4 right-4">
          <StatusBadge status={issue.status} />
        </div>

        {/* Priority */}
        <div className="absolute bottom-4 left-4">
          <span className="badge badge-warning badge-lg font-semibold">
            {issue.priority} Priority
          </span>
        </div>

      </figure>

      {/* Body */}
      <div className="space-y-5 p-6">

        <div>

          <h2 className="line-clamp-1 text-2xl font-bold group-hover:text-primary transition-colors">

            {issue.title}

          </h2>

          <p className="mt-2 text-sm text-base-content/60">
            Public issue reported by a citizen.
          </p>

        </div>

        <div className="space-y-4">

          <div className="flex items-center gap-3">

            <div className="rounded-full bg-primary/10 p-2">
              <FaMapMarkerAlt className="text-primary" />
            </div>

            <div>

              <p className="text-xs uppercase text-base-content/50">
                Village
              </p>

              <p className="font-medium">
                {issue.village}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="rounded-full bg-warning/10 p-2">
              <FaFlag className="text-warning" />
            </div>

            <div>

              <p className="text-xs uppercase text-base-content/50">
                Priority
              </p>

              <p className="font-medium">
                {issue.priority}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="rounded-full bg-success/10 p-2">
              <FaCalendarAlt className="text-success" />
            </div>

            <div>

              <p className="text-xs uppercase text-base-content/50">
                Reported
              </p>

              <p className="font-medium">
                {new Date(issue.created_at).toLocaleDateString()}
              </p>

            </div>

          </div>

        </div>

        <Link
          to={`/officer/issues/${issue.id}`}
          className="btn btn-primary btn-block rounded-2xl group/button"
        >
          View Details

          <FaArrowRight className="transition-transform duration-300 group-hover/button:translate-x-2" />

        </Link>

      </div>

    </div>
  );
};

export default PendingIssueCard;