import { readFileSync } from "fs";
import gendiff from "../bin/gendiff.js";

const resultPlain = readFileSync('__fixtures__/test1OutputDefault.txt', 'utf8');
const file1 = "./__fixtures__/file1.json";
const file2 = "./__fixtures__/file2.json";

test("generate difference for JSON", () => {
  expect(gendiff(file1, file2)).toEqual(resultPlain);
});
