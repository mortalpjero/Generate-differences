import gendiff from '../src/index.js';
import readFile from '../src/readFile.js';

const result1Plain = readFile('test1OutputDefault.txt');
const file1json = 'file1.json';
const file2json = 'file2.json';
const file1yaml = 'file1.yaml';
const file2yaml = 'file2.yaml';
const file1yml = 'file1.yml';
const file2yml = 'file2.yml';

const formatErr = new Error("Wrong file format: normal. Supported formats: 'stylish'");

test('generate difference for JSON', () => {
  expect(gendiff(file1json, file2json)).toEqual(result1Plain);
  expect(() => gendiff(file1json, file2json, 'normal')).toThrow(formatErr);
});

test('generate difference for YAML', () => {
  expect(gendiff(file1yaml, file2yaml)).toEqual(result1Plain);
  expect(gendiff(file1yml, file2yml)).toEqual(result1Plain);
});
