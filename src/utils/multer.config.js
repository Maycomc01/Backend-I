import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
  const safeName = file.originalname.replace(/\s+/g, "_");
  cb(null, Date.now() + "-" + safeName);
}
});

const uploaderMulter = multer({ storage });

export default uploaderMulter;