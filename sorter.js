const fs = require("fs");
const path = require("path");

const sorter = function(src, dist, del) {
  fs.readdir(src, function(err, files) {
    if (err) throw err;

    files.forEach(function(file) {
      const currentPath = path.join(src, file);

      fs.stat(currentPath, function(err, stats) {
        if (err) throw err;

        if (stats.isDirectory()) {
          sorter(currentPath, dist);
        } else {
          const fileBase = path.parse(currentPath).base;
          const newDir = path.join(dist, fileBase[0].toUpperCase());
          const newPath = path.join(newDir, fileBase);

          fs.mkdir(newDir, { recursive: true }, function(err) {
            if (err) throw err;
          })

          fs.exists(newPath, function(e) {
            if (e) {
              console.log(`Warning: File ${fileBase} has duplicates`);
            } else {
              fs.link(currentPath, newPath, function(err) {
                if (err) throw err;
              })
            }
          })
        }
      })
    })
  })
}

module.exports = sorter;
