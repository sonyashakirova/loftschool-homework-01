const yargs = require("yargs");
const path = require("path");
const sorter = require("./sorter");

const args = yargs
  .usage("Usage: node $0 [options]")
  .help("help")
  .alias("help", "h")
  .version("1.0.0")
  .alias("version", "v")
  .example("node $0 --entry ./path/ --dist ./path/")
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
  .argv

try {
  sorter(
    path.join(__dirname, args.entry),
    path.join(__dirname, args.dist),
  )
} catch(err) {
  console.log(err)
}
