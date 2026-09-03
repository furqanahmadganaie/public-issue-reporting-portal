import multer from "multer";
 // When a user uploads a file, temporarily keep the uploaded file in the server's RAM (memory) 
 // instead of saving it as a file on the server's disk.
const storage = multer.memoryStorage(); // 

const upload = multer({storage,limits: { fileSize: 5 * 1024 * 1024, },
 // when file is uplaoded this file runns and multer gives req,file,cb(callback)
  fileFilter(req, file, cb) {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new Error(
          "Only JPG, JPEG, PNG and WEBP images are allowed."
        )
      );
    }

    cb(null, true);
  },
});

export default upload;