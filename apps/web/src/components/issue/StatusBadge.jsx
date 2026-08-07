import {
  FaCheckCircle,
  FaClipboardList,
  FaSpinner,
  FaTasks,
} from "react-icons/fa";

const statusConfig = {
  Pending: {
    icon: FaClipboardList,
    classes:
      "bg-yellow-100 text-yellow-700 border-yellow-300",
  },

  Assigned: {
    icon: FaTasks,
    classes:
      "bg-blue-100 text-blue-700 border-blue-300",
  },

  "In Progress": {
    icon: FaSpinner,
    classes:
      "bg-orange-100 text-orange-700 border-orange-300",
  },

  Resolved: {
    icon: FaCheckCircle,
    classes:
      "bg-green-100 text-green-700 border-green-300",
  },
};

const StatusBadge = ({ status }) => {
  const config =
    statusConfig[status] ||
    statusConfig.Pending;

  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${config.classes}`}
    >
      <Icon />

      {status}
    </div>
  );
};

export default StatusBadge;