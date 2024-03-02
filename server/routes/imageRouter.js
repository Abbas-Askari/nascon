const { upload } = require("../middleware/storage");

const router = require("express").Router();

router.post("/", upload.array("images"), (req, res) => {
  const urls = req.files.map((file) => {
    console.log(file);
    return file.filename;
  });
  res.json({ urls });
});

module.exports = router;
