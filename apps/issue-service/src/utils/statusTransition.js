import { ISSUE_STATUS } from "../constants/issueStatus.js";

export const isValidTransition = (
  currentStatus,
  newStatus
) => {
  const transitions = {
    [ISSUE_STATUS.PENDING]: [
      ISSUE_STATUS.ASSIGNED,
    ],

    [ISSUE_STATUS.ASSIGNED]: [
      ISSUE_STATUS.IN_PROGRESS,
    ],

    [ISSUE_STATUS.IN_PROGRESS]: [
      ISSUE_STATUS.RESOLVED,
    ],

    [ISSUE_STATUS.RESOLVED]: [],
  };

  return (
    transitions[currentStatus]?.includes(
      newStatus
    ) || false
  );
};