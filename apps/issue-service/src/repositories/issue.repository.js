import pool from "../config/db.js";

export const createIssueRepository = async ({
  title,
  description,
  village,
  address,
  latitude,
  longitude,
  citizenId,
}) => {
  const result = await pool.query(
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