import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    // callback : errorHandler and file storage path
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    // callback : errorHandler and fileName
    cb(null, file.originalname + '-' + uniqueSuffix)
  }
});

const upload = multer({ storage })
export default upload;