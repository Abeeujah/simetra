import multer from "multer";
import {
  registerFreelancerSchema,
  updateFreelancerSchema,
} from "../../schemas/freelancer.schema.js";
import { validationErrorBuilder } from "../../utils/validation.util.js";

function checkFileType(req, file, cb) {
  // Validate req.body
  const validator =
    req.method === "POST" ? registerFreelancerSchema : updateFreelancerSchema;
  const validation = validator.safeParse(req.body);

  if (!validation.success) {
    const { errors } = validation.error;
    const message = validationErrorBuilder(errors);
    cb(JSON.stringify({ code: 400, message }), false);
  }

  // Validate the file
  if (!file) {
    cb({ code: 400, message: "Please provide the File" }, false);
  }

  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(file.originalname.toString());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      {
        code: 400,
        message: "Error: Invalid file type provided, Images only!",
      },
      false
    );
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => checkFileType(req, file, cb),
});

export const freelancerUpload = upload.fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "coverBanner", maxCount: 1 },
  // { name: "imageReferences", maxCount: 4 },
  { name: "imageReferenceI", maxCount: 1 },
  { name: "imageReferenceII", maxCount: 1 },
  { name: "imageReferenceIII", maxCount: 1 },
  { name: "imageReferenceIV", maxCount: 1 },
]);
