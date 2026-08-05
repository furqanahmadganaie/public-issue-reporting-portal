import pool from "../config/db.js";

export const createIssueRepository = async (
  client,
  {
    title,
    description,
    village,
    address,
    latitude,
    longitude,
    citizenId,
  }
) => {
  const result = await client.query(
    `
    INSERT INTO issues
    (
      title,
      description,
      village,
      address,
      latitude,
      longitude,
      citizen_id
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7
    )
    RETURNING *
    `,
    [
      title,
      description,
      village,
      address,
      latitude,
      longitude,
      citizenId,
    ]
  );

  return result.rows[0];
};

export const createIssueImageRepository = async (
  client,
  issueId,
  imageUrl,
  publicId
) => {
  await client.query(
    `
    INSERT INTO issue_images
    (
      issue_id,
      image_url,
      public_id
    )
    VALUES
    (
      $1,
      $2,
      $3
    )
    `,
    [
      issueId,
      imageUrl,
      publicId,
    ]
  );
};

export const getIssueImagesRepository = async (
  client,
  issueId
) => {
  const result = await client.query(
    `
    SELECT
      id,
      image_url,
      public_id
    FROM issue_images
    WHERE issue_id = $1
    ORDER BY id
    `,
    [issueId]
  );

  return result.rows;
};
export { pool };

export const getMyIssuesRepository = async (
  citizenId
) => {
  const result = await pool.query(
    `
    SELECT

        i.id,

        i.title,

        i.village,

        i.status,

        i.priority,

        i.created_at,

        (
            SELECT image_url
            FROM issue_images
            WHERE issue_id = i.id
            ORDER BY id
            LIMIT 1
        ) AS image_url

    FROM issues i

    WHERE i.citizen_id = $1

    ORDER BY i.created_at DESC
    `,
    [citizenId]
  );

  return result.rows;
};

export const getIssueByIdRepository = async (
  issueId,
  citizenId
) => {
  const result = await pool.query(
    `
    SELECT
        *
    FROM issues
    WHERE id = $1
      AND citizen_id = $2
    `,
    [
      issueId,
      citizenId,
    ]
  );

  return result.rows[0];
};

export const getIssueImagesByIssueIdRepository = async (
  issueId
) => {
  const result = await pool.query(
    `
    SELECT
        id,
        image_url,
        public_id
    FROM issue_images
    WHERE issue_id = $1
    ORDER BY id
    `,
    [issueId]
  );

  return result.rows;
};