import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Say What Actually Broke — one line of error copy, at most 200 chars.
// Names the real failure (disk full mid-save), tells the brutal truth
// (the success checkmark lied), and says what to do next (try again).
const ENTRY =
  "The server ran out of disk space mid-save, so your file is nowhere and the green checkmark lied to you. Try again \u2014 we just cleared 4 GB of logs nobody had read since 2019.";
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, must be 1-200`);
}
if (!ENTRY.trim()) {
  throw new Error("entry must not be whitespace-only");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
