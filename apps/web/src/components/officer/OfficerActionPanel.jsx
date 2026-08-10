import PendingAction from "./PendingAction";
import AssignedAction from "./AssignedAction";
import InProgressAction from "./InProgressAction";
import ResolvedAction from "./ResolvedAction";

const OfficerActionPanel = ({ issue }) => {
  switch (issue.status) {

    case "Pending":
      return <PendingAction issue={issue} />;

    case "Assigned":
      return <AssignedAction issue={issue} />;

    case "In Progress":
      return <InProgressAction issue={issue} />;

    case "Resolved":
      return <ResolvedAction issue={issue} />;

    default:
      return null;
  }
};

export default OfficerActionPanel;