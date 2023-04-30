const path = require("path");
const fsPromise = require("./fs-promise");

const sorter = async function(src, dist) {
  const files = await fsPromise.readdir(src);

  for (const file of files) {
    const currentPath = path.join(src, file);
    const stat = await fsPromise.stats(currentPath);

    if (stat.isDirectory()) {
      await sorter(currentPath, dist);
    } else {
      const fileBase = path.parse(currentPath).base;
      const newDir = path.join(dist, fileBase[0].toUpperCase());
      const newPath = path.join(newDir, fileBase);

      await fsPromise.mkdir(newDir);
      
      const alreadyExists = await fsPromise.exists(newPath);

      if (alreadyExists) {
        console.log(`Warning: File ${fileBase} has duplicates`);
      } else {
        await fsPromise.link(currentPath, newPath);
      }
    }
  }
}

module.exports = sorter;
