import fs from "fs";

export function loadLines(fname: string) {
  const file = fs.readFileSync(fname, "utf8");
  return file.split("\n");
}

export function writeArrs(arrs: string[], outfile: string) {
  fs.writeFileSync(outfile, arrs.join("\n"), "utf8");
}

export function zip(a: string[], b: string[]) {
  const result: Record<string, string> = {};
  a.forEach((key, idx) => result[key] = b[idx]);
  return result;
}

export function chunks<T>(array: T[], parts: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += parts) {
    const chunk = array.slice(i, i + parts);

    const chunkIndex = Math.floor(i/parts);
    result[chunkIndex] = chunk;
  }
  return result;
}
