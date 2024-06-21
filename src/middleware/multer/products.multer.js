import multer from "multer";

function checkFileType(req, file, cb) {
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
        success: false,
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
