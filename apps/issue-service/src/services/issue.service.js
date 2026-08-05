import {
  pool,
  createIssueRepository,
  createIssueImageRepository,
  getIssueImagesRepository,getMyIssuesRepository,getIssueByIdRepository,getIssueImagesByIssueIdRepository
} from "../repositories/issue.repository.js";

import {
  uploadImage,
  deleteImage,
} from "../utils/cloudinary.js";



export const createIssueService = async ( issueData,files,userId) => {

//   console.log("Issue Data:", issueData);
//   console.log("Files:", files);

  const {
    title,description,village,address,latitude,longitude,} = issueData;

//   console.log("Before validation");

//   console.log({
//   title,
//   description,
//   village,
//   address,
//   latitude,
//   longitude,
// });

// console.log("!title:", !title);
// console.log("!description:", !description);
// console.log("!village:", !village);
// console.log("!address:", !address);
// console.log("latitude === undefined:", latitude === undefined);
// console.log("longitude === undefined:", longitude === undefined);

if (
  !title ||
  !description ||
  !village ||
  !address ||
  latitude === undefined ||
  longitude === undefined
) {
  throw new Error("All fields are required.");
}

// console.log("Validation passed");

  const client = await pool.connect();

  const uploadedImages = [];

  try {
    await client.query("BEGIN");

    const issue = await createIssueRepository(
      client,
      {
        title,
        description,
        village,
        address,
        latitude,
        longitude,
        citizenId: userId,
      }
    );

    if (files && files.length > 0) {
      for (const file of files) {
        const uploaded = await uploadImage(
          file,
          "public-issue-reporting/issues"
        );

        uploadedImages.push(uploaded);

        await createIssueImageRepository(
          client,
          issue.id,
          uploaded.secure_url,
          uploaded.public_id
        );
      }
    }

    await client.query("COMMIT");

    const images = await getIssueImagesRepository(
  client,
  issue.id
);

    return { issue,images };

  } catch (error) {
     console.error(error);
    await client.query("ROLLBACK");

    for (const image of uploadedImages) {
      await deleteImage(image.public_id);
    }

    throw error;
  } finally {
    client.release();
  }
};


export const getMyIssuesService = async (
  userId
) => {
  return await getMyIssuesRepository(userId);
};


export const getIssueByIdService = async (
  issueId,
  userId
) => {
  const issue = await getIssueByIdRepository(
    issueId,
    userId
  );

  if (!issue) {
    throw new Error("Issue not found.");
  }

  const images =
    await getIssueImagesByIssueIdRepository(
      issueId
    );

  return {
    ...issue,
    images,
  };
};