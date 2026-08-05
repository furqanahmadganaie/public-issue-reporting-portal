import { createIssueRepository } from "../repositories/issue.repository.js";

export const createIssueService = async (
  issueData,
  userId
) => {
  const {
    title,
    description,
    village,
    address,
    latitude,
    longitude,
  } = issueData;

  if (
    !title ||
    !description ||
    !village ||
    !address ||
    latitude === undefined ||
    longitude === undefined
  ) {
    throw new Error("All fields are required");
  }

  const issue = await createIssueRepository({
    title,
    description,
    village,
    address,
    latitude,
    longitude,
    citizenId: userId,
  });

  return issue;
};