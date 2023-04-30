const fs = require("fs");

const readdir = function(src) {
  return new Promise(function(resolve, reject) {
    fs.readdir(src, function(err, files) {
      if (err) reject(err);

      resolve(files);
    })
  })
}

const stats = function(src) {
  return new Promise(function(resolve, reject) {
      fs.stat(src, (err, stats) => {
          if (err) reject(err);

          resolve(stats);
      })
  })
}

const mkdir = function(dirname) {
  return new Promise(function(resolve, reject) {
    fs.mkdir(dirname, { recursive: true }, function(err) {
      if (err) reject(err);

      resolve();
    })
  })
}

const exists = function(path) {
  return new Promise(function(resolve) {
    fs.exists(path, function(e) {
      resolve(e);
    })
  })
}

const link = function(path, newPath) {
  return new Promise(function(resolve, reject) {
    fs.link(path, newPath, function(err) {
      if (err) reject(err);

      resolve();
    })
  })
}

const rm = function(path) {
  return new Promise(function(resolve, reject) {
    fs.rm(path, { recursive: true }, function(err) {
      if (err) reject(err);

      resolve();
    });
  })
}

module.exports = {
  readdir,
  stats,
  mkdir,
  exists,
  link,
  rm,
}
