let conn = require("../DB-Connect/connect-db").conn;
const multer = require("multer");
let mongoose = require('mongoose');
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
let crypto = require('crypto')
const dbUrl = process.env.DB_URL;
const secret = process.env.SECRET;

const storage = new GridFsStorage({
  url: dbUrl,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const fileInfo = {
          bucketName: "uploads",
          filename: file.originalname,
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

module.exports = {upload,storage};