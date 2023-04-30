const yargs = require("yargs");
const path = require("path");
const sorter = require("./sorter");
const fsPromise = require("./fs-promise");

const args = yargs
  .usage("Usage: node $0 [options]")
  .help("help")
  .alias("help", "h")
  .version("1.0.0")
  .alias("version", "v")
  .example("node $0 --entry ./path/ --dist ./path/ --delete")
  .option("entry", {
    alias: "e",
    describe: "Путь к исходной папке",
    demandOption: true,
  })
  .option("dist", {
    alias: "d",
    describe: "Путь к итоговой папке",
    default: "./dist",
  })
  .option("delete", {
    alias: "D",
    describe: "Удалить ли исходную папку",
    boolean: true,
    default: false,
  })
  .argv

const config = {
  src: path.join(__dirname, args.entry),
  dist: path.join(__dirname, args.dist),
  delete: args.delete,
}

;(async function() {
  try {
    await sorter(config.src, config.dist)

    if (config.delete) {
      await fsPromise.rm(config.src)
    }
  } catch (err) {
    console.log(err)
  }
})()
