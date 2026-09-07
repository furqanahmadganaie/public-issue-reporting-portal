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

import { publishEvent } from "@portal/kafka";



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
  // latitude or logitude can be zero that why  is 
) {
  throw new Error("All fields are required.");
}

// console.log("Validation passed");

  const client = await pool.connect();

  const uploadedImages = []; // array of images to keep tack of them to delete if trasaction fails 


  try {
    await client.query("BEGIN");

    const issue = await createIssueRepository(
      client, // so the repo uses same transaction connection 
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

        // upload image to cloudinary 
        const uploaded = await uploadImage(
          file,
          "public-issue-reporting/issues"
        );

//  console.log(uploaded);
        //  save uploaded imfromation for cleanup 

        uploadedImages.push(uploaded);
 
        // save cloundinary info in postgresql
        await createIssueImageRepository(
          client,
          issue.id,
          uploaded.secure_url,
          uploaded.public_id
        );
      }
    }

    await client.query("COMMIT");

//  creates the event to be published to the kafka topic "issue.created" with the issue details and the citizen ID of the user who created the issue. 
// This allows other services to be notified of the new issue creation. 

    await publishEvent({
  topic: "issue.created",
  key: issue.id,
  event: {
    event: "ISSUE_CREATED",
    issueId: issue.id,
    citizenId: userId,
    title: issue.title,
    createdAt: new Date().toISOString(),
  },
});

//  This queries the database to get the images belonging to the issue.
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