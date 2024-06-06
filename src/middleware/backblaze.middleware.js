import B2 from "backblaze-b2";
import defaults from "../../config/defaults.js";

// Pull backblaze environment variables
const applicationKeyId = defaults["backBlazeAppKeyID"];
const applicationKey = defaults["backBlazeAppKey"];

const bucketId = defaults["backBlazeBucketID"];
const bucketName = defaults["backBlazeBucketName"];

export const uploadB2 = async (req, res, next) => {
  try {
    if (!req.files || !Object.keys(req.files).length) {
      return next();
    }

    // Configure and authorize backblaze
    const b2 = new B2({ applicationKeyId, applicationKey });
    const b2AuthResponse = await b2.authorize();
    const { downloadUrl } = b2AuthResponse.data;

    const uploads = [];

    for (const [field, files] of Object.entries(req.files)) {
      files.forEach((file) => uploads.push({ field, file }));
    }

    const uploadMapping = {};

    // Upload files concurrently
    await Promise.all(
      uploads.map(async ({ field, file }) => {
        // Authorize upload request
        const bucketResponse = await b2.getUploadUrl({ bucketId });
        const { authorizationToken, uploadUrl } = bucketResponse.data;

        // Build upload file config
        const fileUploadOptions = {
          uploadUrl,
          uploadAuthToken: authorizationToken,
          fileName: `testing/${file.originalname}`,
          data: file.buffer,
        };

        // Upload file
        const uploadedFile = await b2.uploadFile(fileUploadOptions);
        const { fileName } = uploadedFile.data;

        // File public url
        const url = `${downloadUrl}/file/${bucketName}/${fileName}`;
        uploadMapping[field] = url;
      })
    );

    // Pass uploaded files metadata to the request handler
    res.locals.uploadMapping = uploadMapping;

    return next();
  } catch (error) {
    console.log({ backBlazeError: error });
    return res
      .status(500)
      .json({ success: false, message: "Failed to complete file uploads." });
  }
};
