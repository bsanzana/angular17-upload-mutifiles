const router = require("express").Router();
const fs = require("node:fs");
const uploadMiddleware = require("../../middleware/uploadMiddleware");

router.post("/", uploadMiddleware.array("files"), async (req, res) => {
  files = req.files;
  if (Array.isArray(files) && files.length > 0) {
    //res.json(files);
    saveFiles(files, req.body.user, req.body.directory);
    res.json(files);
  } else {
    console.log("File upload unsuccessful");
  }
});

function createDirectory(path) {
  fs.mkdirSync(path, { recursive: true }, (err) => {
    if (err) {
      console.error("Error al crear el directorio:", err);
      return;
    }
    console.log("Directorio creado exitosamente");
  });
}

function saveFiles(files, user, directory) {
  pathUser = `${__dirname}/uploads/${user}`;
  pathUserFiles = `${__dirname}/uploads/${user}/${directory}`;
  createDirectory(pathUser);
  createDirectory(pathUserFiles);

  files.forEach((file) => {
    newPath = pathUserFiles + `/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    file.path = newPath;
  });

  return files;
}

router.get("/getFiles/", async (req, res) => {
  const baseUrl = `${__dirname}/uploads/`;
  const directoryPath = baseUrl;
  if (!fs.existsSync(baseUrl)) {
    return res.send([]);
  }
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
});
module.exports = router;
