import multer from "multer";
import {
  productReviewSchema,
  updateProductReviewSchema,
} from "../../schemas/reviews.schema.js";
import { validationErrorBuilder } from "../../utils/validation.util.js";

function checkFileType(req, file, cb) {
  // Validate req.body
  const validator =
    req.method === "POST" ? productReviewSchema : updateProductReviewSchema;
  const validation = validator.safeParse(req.body);

  if (!validation.success) {
    const { errors } = validation.error;
    const message = validationErrorBuilder(errors);
    cb(JSON.stringify({ success: false, message }), false);
  }

  // Validate the file
  if (!file) {
    cb({ success: false, message: "Please provide the File" }, false);
  }

  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|flv|mp4|m3u8|ts|3gp|mov|avi|wmv/;
  // Check ext
  const extname = filetypes.test(file.originalname.toString());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      JSON.stringify({
        success: false,
        message: "Error: Invalid file type provided, Image and Video only!",
      }),
      false
    );
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => checkFileType(req, file, cb),
});

export const reviewUpload = upload.fields([{ name: "media", maxCount: 1 }]);
