// import pool from "../config/db.js";

export const getDashboardRepository = async (client, officerId) => {
  const pendingQuery = `
    SELECT COUNT(*) AS count
    FROM issues
    WHERE status = 'Pending';
  `;

  const assignedQuery = `
    SELECT COUNT(*) AS count
    FROM issues
    WHERE assigned_officer_id = $1
      AND status = 'Assigned';
  `;

  const inProgressQuery = `
    SELECT COUNT(*) AS count
    FROM issues
    WHERE assigned_officer_id = $1
      AND status = 'In Progress';
  `;

  const resolvedQuery = `
    SELECT COUNT(*) AS count
    FROM issues
    WHERE assigned_officer_id = $1
      AND status = 'Resolved';
  `;

  const [pending, assigned, inProgress, resolved] =
    await Promise.all([
      client.query(pendingQuery),
      client.query(assignedQuery, [officerId]),
      client.query(inProgressQuery, [officerId]),
      client.query(resolvedQuery, [officerId]),
    ]);

  return {
    pending: Number(pending.rows[0].count),
    assigned: Number(assigned.rows[0].count),
    inProgress: Number(inProgress.rows[0].count),
    resolved: Number(resolved.rows[0].count),
  };
};

export const getPendingIssuesRepository = async (client) => {
  const query = `
    SELECT
      i.id,
      i.title,
      i.description,
      i.village,
      i.address,
      i.priority,
      i.status,
      i.created_at,

      (
        SELECT image_url
        FROM issue_images
        WHERE issue_id = i.id
        LIMIT 1
      ) AS image_url

    FROM issues i

    WHERE
      i.status = 'Pending'
      AND i.assigned_officer_id IS NULL

    ORDER BY i.created_at ASC;
  `;

  const result = await client.query(query);

  return result.rows;
};

export const getIssueDetailsRepository = async (client, issueId) => {
  const query = `
    SELECT *
    FROM issues
    WHERE id = $1;
  `;

  const result = await client.query(query, [issueId]);

  if (result.rows.length === 0) {
    throw new Error("Issue not found");
  }

  const issue = result.rows[0];

  const imagesQuery = `
    SELECT
      id,
      image_url,
      public_id
    FROM issue_images
    WHERE issue_id=$1
  `;

  const images = await client.query(imagesQuery, [issueId]);

  issue.images = images.rows;

  return issue;
};

export const acceptIssueRepository = async (
  client,
  issueId,
  officerId
) => {
  const query = `
    UPDATE issues
    SET
      assigned_officer_id=$1,
      status='Assigned',
      updated_at=NOW()
    WHERE id=$2
    RETURNING *;
  `;

  const result = await client.query(query, [
    officerId,
    issueId,
  ]);

  return result.rows[0];
};

export const createIssueUpdateRepository = async (
  client,
  issueId,
  officerId,
  status,
  remark,
  latitude,
  longitude
) => {
  const query = `
    INSERT INTO issue_updates
    (
      issue_id,
      officer_id,
      status,
      remark,
      latitude,
      longitude
    )

    VALUES($1,$2,$3,$4,$5,$6)

    RETURNING *;
  `;

  const result = await client.query(query, [
    issueId,
    officerId,
    status,
    remark,
    latitude,
    longitude,
  ]);

  return result.rows[0];
};

export const getAssignedIssuesRepository = async (
  client,
  officerId
) => {
  const query = `
    SELECT
      i.id,
      i.title,
      i.description,
      i.village,
      i.address,
      i.priority,
      i.status,
      i.created_at,

      (
        SELECT image_url
        FROM issue_images
        WHERE issue_id = i.id
        LIMIT 1
      ) AS image_url

    FROM issues i

    WHERE
      i.assigned_officer_id = $1
      AND i.status = 'Assigned'

    ORDER BY i.created_at DESC;
  `;

  const result = await client.query(query, [officerId]);

  return result.rows;
};

export const getIssueByIdRepository = async (
  client,
  issueId
) => {
  const query = `
      SELECT *
      FROM issues
      WHERE id=$1
  `;

  const result = await client.query(query, [issueId]);

  return result.rows[0];
};

export const updateIssueStatusRepository = async (
  client,
  issueId,
  status
) => {
  const query = `
      UPDATE issues
      SET
          status=$1,
          updated_at=NOW()
      WHERE id=$2
      RETURNING *;
  `;

  const result = await client.query(query, [
    status,
    issueId,
  ]);

  return result.rows[0];
};


export const createIssueUpdateImageRepository = async (
  client,
  updateId,
  imageUrl,
  publicId
) => {
  const query = `
    INSERT INTO issue_update_images
    (
      update_id,
      image_url,
      public_id
    )
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const result = await client.query(query, [
    updateId,
    imageUrl,
    publicId,
  ]);

  return result.rows[0];
};


export const getIssueTimelineRepository = async (
  client,
  issueId
) => {
  const updatesQuery = `
    SELECT
      iu.id,
      iu.issue_id,
      iu.officer_id,
      iu.status,
      iu.remark,
      iu.latitude,
      iu.longitude,
      iu.created_at

    FROM issue_updates iu

    WHERE iu.issue_id = $1

    ORDER BY iu.created_at ASC;
  `;

  const updates = await client.query(
    updatesQuery,
    [issueId]
  );

  const timeline = [];

  for (const update of updates.rows) {
    const imagesQuery = `
      SELECT
        id,
        image_url,
        public_id
      FROM issue_update_images
      WHERE update_id = $1;
    `;

    const images = await client.query(
      imagesQuery,
      [update.id]
    );

    timeline.push({
      ...update,
      images: images.rows,
    });
  }

  return timeline;
};



export const getInProgressIssuesRepository = async (
  client,
  officerId
) => {
  const query = `
    SELECT
      i.id,
      i.title,
      i.description,
      i.village,
      i.address,
      i.priority,
      i.status,
      i.created_at,

      (
        SELECT image_url
        FROM issue_images
        WHERE issue_id = i.id
        LIMIT 1
      ) AS image_url

    FROM issues i

    WHERE
      i.assigned_officer_id = $1
      AND i.status = 'In Progress'

    ORDER BY i.updated_at DESC;
  `;

  const result = await client.query(query, [officerId]);

  return result.rows;
};

export const getResolvedIssuesRepository = async (
  client,
  officerId
) => {
  const query = `
    SELECT
      i.id,
      i.title,
      i.description,
      i.village,
      i.address,
      i.priority,
      i.status,
      i.created_at,

      (
        SELECT image_url
        FROM issue_images
        WHERE issue_id = i.id
        LIMIT 1
      ) AS image_url

    FROM issues i

    WHERE
      i.assigned_officer_id = $1
      AND i.status = 'Resolved'

    ORDER BY i.updated_at DESC;
  `;

  const result = await client.query(query, [officerId]);

  return result.rows;
};