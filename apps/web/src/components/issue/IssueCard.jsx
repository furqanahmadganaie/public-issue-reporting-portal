import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBolt,
  FaCarSide,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaFlag,
  FaMapMarkerAlt,
} from "react-icons/fa";

import StatusBadge from "./StatusBadge";

const statusAccent = {
  Pending: "border-b-amber-400",
  Assigned: "border-b-sky-400",
  "In Progress": "border-b-indigo-400",
  Resolved: "border-b-emerald-400",
  Rejected: "border-b-rose-400",
};

const statusIcon = {
  Pending: {
    icon: FaCarSide,
    classes: "bg-amber-100 text-amber-700",
  },
  Assigned: {
    icon: FaFlag,
    classes: "bg-sky-100 text-sky-700",
  },
  "In Progress": {
    icon: FaBolt,
    classes: "bg-indigo-100 text-indigo-700",
  },
  Resolved: {
    icon: FaBolt,
    classes: "bg-emerald-100 text-emerald-700",
  },
  Rejected: {
    icon: FaExclamationTriangle,
    classes: "bg-rose-100 text-rose-700",
  },
};

const IssueCard = ({ issue }) => {
  const accentClass =
    statusAccent[issue.status] || statusAccent.Pending;
  const previewConfig =
    statusIcon[issue.status] || statusIcon.Pending;
  const PreviewIcon = previewConfig.icon;

  return (
    <div className={`group flex h-full min-h-[285px] flex-col overflow-hidden rounded-lg border border-slate-200 border-b-4 bg-white shadow-[0_14px_45px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(37,99,235,0.12)] ${accentClass}`}>

      {issue.image_url ? (
        <figure className="h-28 overflow-hidden bg-slate-100">
          <img
            src={issue.image_url}
            alt={issue.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </figure>
      ) : (
        <div className="px-5 pt-5">
          <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${previewConfig.classes}`}>
            <PreviewIcon size={18} />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">

        <div className="flex items-start justify-between gap-3">

          <h2 className="min-w-0 text-lg font-black tracking-normal text-slate-950">
            {issue.title}
          </h2>

          <StatusBadge status={issue.status} />

        </div>

        <p className="mt-5 flex items-start gap-3 text-sm leading-6 text-slate-600">
          <FaMapMarkerAlt className="mt-1 shrink-0 text-indigo-600" />
          <span>
            <span className="font-bold text-slate-900">Village:</span>{" "}
            {issue.village}
          </span>
        </p>

        <p className="mt-2 flex items-center gap-3 text-sm leading-6 text-slate-600">
          <FaFlag className="shrink-0 text-slate-400" />
          <span>
            <span className="font-bold text-slate-900">Priority:</span>{" "}
            {issue.priority}
          </span>
        </p>

        <p className="mt-4 line-clamp-3 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600">
          {issue.description || "No description provided."}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <FaCalendarAlt className="text-slate-400" />
            {new Date(issue.created_at).toLocaleDateString()}
          </p>

          <Link
            to={`/issues/${issue.id}`}
            className="btn min-h-10 rounded-lg border-0 bg-indigo-50 px-4 text-sm font-bold text-indigo-700 hover:bg-indigo-600 hover:text-white"
          >
            View Details
            <FaArrowRight />
          </Link>

        </div>

      </div>

    </div>
  );
};

export default IssueCard;
