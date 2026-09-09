import { pool } from "../repositories/issue.repository.js";
 import axios from "axios";
import { publishEvent } from "@portal/kafka";
import {
  getDashboardRepository,getPendingIssuesRepository,getIssueDetailsRepository,acceptIssueRepository,createIssueUpdateRepository, getIssueByIdRepository,updateIssueStatusRepository,createIssueUpdateImageRepository,
  getIssueTimelineRepository,getAssignedIssuesRepository,getInProgressIssuesRepository,getResolvedIssuesRepository
} from "../repositories/officer.repository.js";

import { isValidTransition } from "../utils/statusTransition.js";
import {uploadImage,deleteImage} from "../utils/cloudinary.js";

const getCitizen = async (citizenId) => {
  const response = await axios.get(
    `${process.env.IDENTITY_SERVICE_URL}/api/v1/auth/internal/users/${citizenId}`
  );

  return response.data.data;
};

export const getDashboardService = async (officerId) => {
  const client = await pool.connect();

  try {
    const dashboard =
      await getDashboardRepository(
        client,
        officerId
      );

    return dashboard;
  } finally {
    client.release();
  }
};

export const getPendingIssuesService = async () => {
  const client = await pool.connect();

  try {
    return await getPendingIssuesRepository(client);
  } finally {
    client.release();
  }
};


export const getIssueDetailsService = async (
  issueId
) => {
  const client = await pool.connect();

  try {
    return await getIssueDetailsRepository(
      client,
      issueId
    );
  } finally {
    client.release();
  }
};


export const acceptIssueService = async (
  issueId,
  officerId,
  latitude,
  longitude
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const issue =
      await acceptIssueRepository(
        client,
        issueId,
        officerId
      );

    await createIssueUpdateRepository(
      client,
      issueId,
      officerId,
      "Assigned",
      "Issue Accepted",
      latitude,
      longitude
    );

    await client.query("COMMIT");

const citizen = await getCitizen(issue.citizen_id);

await publishEvent({
  topic: "issue.assigned",
  key: issue.id,
  event: {
    event: "ISSUE_ASSIGNED",
    issueId: issue.id,
    citizenId: issue.citizen_id,
    citizenEmail: citizen.email,
    title: issue.title,
    officerId,
    createdAt: new Date().toISOString(),
  },
});

    return issue;

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getAssignedIssuesService = async (
  officerId
) => {
  const client = await pool.connect();

  try {
    return await getAssignedIssuesRepository(
      client,
      officerId
    );
  } finally {
    client.release();
  }
};


export const updateIssueStatusService = async (
  issueId,
  officerId,
  status,
  remark,
  latitude,
  longitude
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const issue =
      await getIssueByIdRepository(
        client,
        issueId
      );

    if (!issue) {
      throw new Error("Issue not found");
    }

    if (
      issue.assigned_officer_id !== officerId
    ) {
      throw new Error(
        "This issue is not assigned to you."
      );
    }

    let updatedIssue = issue;

    // Only validate and update status if it actually changes
    if (status !== issue.status) {

      if (
        !isValidTransition(
          issue.status,
          status
        )
      ) {
        throw new Error(
          `Invalid status transition from ${issue.status} to ${status}`
        );
      }

      updatedIssue =
        await updateIssueStatusRepository(
          client,
          issueId,
          status
        );
    }

    // Always create a timeline entry
    await createIssueUpdateRepository(
      client,
      issueId,
      officerId,
      status,
      remark,
      latitude,
      longitude
    );

    await client.query("COMMIT");
 
    //  

    if (
  status === "In Progress" ||
  status === "Resolved"
) {
  const citizen = await getCitizen(issue.citizen_id);

  await publishEvent({
    topic: "issue.updated",
    key: issueId,
    event: {
      event:
        status === "In Progress"
          ? "ISSUE_IN_PROGRESS"
          : "ISSUE_RESOLVED",

      issueId: issueId,
      citizenId: issue.citizen_id,
      citizenEmail: citizen.email,
      title: issue.title,
      officerId: officerId,
      remark: remark,
      createdAt: new Date().toISOString(),
    },
  });
}

    return updatedIssue;

  } catch (error) {

    await client.query("ROLLBACK");

    throw error;

  } finally {

    client.release();

  }
};



export const uploadProgressImagesService = async (
  issueId,
  officerId,
  files
) => {
  const client = await pool.connect();

  const uploadedImages = [];

  try {
    await client.query("BEGIN");

    const latestUpdateQuery = `
      SELECT id
      FROM issue_updates
      WHERE issue_id = $1
        AND officer_id = $2
      ORDER BY created_at DESC
      LIMIT 1;
    `;

    const latestUpdate = await client.query(
      latestUpdateQuery,
      [issueId, officerId]
    );

    if (latestUpdate.rows.length === 0) {
      throw new Error(
        "No issue update found. Update the issue status first."
      );
    }

    const updateId = latestUpdate.rows[0].id;

    const images = [];

    for (const file of files) {
      const uploaded = await uploadImage(
        file,
        "public-issue-reporting/progress"
      );

      uploadedImages.push(uploaded);

      const image =
        await createIssueUpdateImageRepository(
          client,
          updateId,
          uploaded.secure_url,
          uploaded.public_id
        );

      images.push(image);
    }

    await client.query("COMMIT");

    return images;
  } catch (error) {
    await client.query("ROLLBACK");

    for (const image of uploadedImages) {
      await deleteImage(image.public_id);
    }

    throw error;
  } finally {
    client.release();
  }
};

export const getIssueTimelineService = async (
  issueId
) => {
  const client = await pool.connect();

  try {
    return await getIssueTimelineRepository(
      client,
      issueId
    );
  } finally {
    client.release();
  }
};

export const getInProgressIssuesService = async (
  officerId
) => {
  const client = await pool.connect();

  try {
    return await getInProgressIssuesRepository(
      client,
      officerId
    );
  } finally {
    client.release();
  }
};

export const getResolvedIssuesService = async (
  officerId
) => {
  const client = await pool.connect();

  try {
    return await getResolvedIssuesRepository(
      client,
      officerId
    );
  } finally {
    client.release();
  }
};