import multer from "multer";
import {
  createProductSchema,
  updateProductSchema,
} from "../../schemas/product.schema.js";

function checkFileType(req, file, cb) {
  // Validate req.body
  const validator =
    req.method === "POST" ? createProductSchema : updateProductSchema;
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

export const productImagesUpload = upload.fields([
  // { name: "images", maxCount: 5 },
  { name: "productImageI", maxCount: 1 },
  { name: "productImageII", maxCount: 1 },
  { name: "productImageIII", maxCount: 1 },
  { name: "productImageIV", maxCount: 1 },
  { name: "productImageV", maxCount: 1 },
]);
