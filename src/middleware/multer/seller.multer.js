import multer from "multer";
import {
  sellerSetupSchema,
  updateSellerSchema,
} from "../../schemas/seller.schema.js";

function checkFileType(req, file, cb) {
  // Validate req.body
  const validator =
    req.method === "POST" ? sellerSetupSchema : updateSellerSchema;
  const validation = validator.safeParse(req.body);

  if (!validation.success) {
    cb(
      JSON.stringify({ code: 400, message: "Validation errors, Bad request" }),
      false
    );
  }

  // Validate the file
  if (!file) {
    cb(
      JSON.stringify({ code: 400, message: "Please provide the File" }),
      false
    );
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

export const sellerUpload = upload.fields([
  { name: "coverBanner", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
]);
