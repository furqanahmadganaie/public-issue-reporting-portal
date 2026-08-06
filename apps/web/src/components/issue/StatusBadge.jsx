const statusClasses = {
  Pending: "badge badge-warning",
  Assigned: "badge badge-info",
  "In Progress": "badge badge-primary",
  Resolved: "badge badge-success",
  Closed: "badge badge-neutral",
  Rejected: "badge badge-error",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={
        statusClasses[status] || "badge badge-outline"
      }
    >
      {status}
    </span>
  );
};

export default StatusBadge;