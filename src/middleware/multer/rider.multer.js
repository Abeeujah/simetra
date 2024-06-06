import multer from "multer";
import {
  riderSetupSchema,
  updateRiderSchema,
} from "../../schemas/rider.schema.js";

function checkFileType(req, file, cb) {
  // Validate req.body
  const validator =
    req.method === "POST" ? riderSetupSchema : updateRiderSchema;
  const validation = validator.safeParse(req.body);

  if (!validation.success) {
    const { errors } = validation.error;
    const message = validationErrorBuilder(errors);
    cb(JSON.stringify({ code: 400, message }), false);
  }

  // Validate the file
  if (!file) {
    cb(
      JSON.stringify({ code: 400, message: "Please provide the File" }),
      false
    );
  }

  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|pdf|docx/;
  // Check ext
  const extname = filetypes.test(file.originalname.toString());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      JSON.stringify({
        code: 400,
        message: "Error: Invalid file type provided, Images only!",
      }),
      false
    );
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => checkFileType(req, file, cb),
});

export const riderUpload = upload.fields([
  { name: "riderPicture", maxCount: 1 },
  { name: "vehiclePicture", maxCount: 1 },
  { name: "vehicleDocument", maxCount: 1 },
]);
