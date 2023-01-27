import assert from "assert";
import * as url from "url";
import { join } from "path";
import { loadLines, writeArrs, chunks, zip } from "./utils";
import { translate } from "./papago";

const inputdir = process.argv[2];
const outfile = process.argv[3];
assert(!!inputdir);
assert(!!outfile);

const __dirname = url.fileURLToPath(new URL("..", import.meta.url));

const transIds = loadLines(join(__dirname, inputdir, "kr.lang.txt.id"));
const transStrs = loadLines(join(__dirname, inputdir, "kr.lang.txt"));
const origIds = loadLines(join(__dirname, inputdir, "en.lang.txt.id"));
const origStrs = loadLines(join(__dirname, inputdir, "en.lang.txt"));

console.info("translated", Object.keys(transIds).length);
console.info("origs", Object.keys(origIds).length);

const translated = zip(transIds, transStrs);
const result = zip(origIds, origStrs);

const ChunkSize = 10;

await Promise.all(chunks(origIds, ChunkSize).map(ids => {
  return Promise.all(ids.map(async (id) => {
    result[id] = translated[id] || await translate(result[id]);
    console.log(id, result[id]);
  }));
}));

const resultArr = origIds.map(id => result[id]);

writeArrs(resultArr, join(__dirname, outfile));
