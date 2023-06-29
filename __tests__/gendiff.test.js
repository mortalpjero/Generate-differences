import gendiff from '../src/index.js';
import readFile from '../src/readFile.js';

const result1Stylish = readFile('__fixtures__/test1OutputDefault.txt');
const result2Plain = readFile('__fixtures__/test2OutputPlain.txt');
const result3JSON = readFile('__fixtures__/test3OutputJSON.txt');

const file1json = '__fixtures__/file1.json';
const file2json = '__fixtures__/file2.json';
const file1yaml = '__fixtures__/file1.yaml';
const file2yaml = '__fixtures__/file2.yaml';
const file1yml = '__fixtures__/file1.yml';
const file2yml = '__fixtures__/file2.yml';
const file1txt = '__fixtures__/file1.txt';
const file2txt = '__fixtures__/file2.txt';

const formatErr = new Error("Wrong file format: normal. Supported formats: 'stylish'");
const extensionErr = new Error("Wrong file extension: 'txt'. Supported formats: 'JSON', 'YAML', 'YML'");

test('generate difference for JSON', () => {
  expect(gendiff(file1json, file2json)).toEqual(result1Stylish);
  expect(gendiff(file1json, file2json, 'plain')).toEqual(result2Plain);
  expect(() => gendiff(file1json, file2json, 'normal')).toThrow(formatErr);
  expect(gendiff(file1json, file2json, 'json')).toEqual(result3JSON);
});

test('generate difference for YAML', () => {
  expect(gendiff(file1yaml, file2yaml)).toEqual(result1Stylish);
  expect(gendiff(file1yaml, file2yaml, 'plain')).toEqual(result2Plain);
  expect(gendiff(file1yml, file2yml)).toEqual(result1Stylish);
  expect(gendiff(file1yml, file2yml, 'plain')).toEqual(result2Plain);
});

test('generate difference wrong extension', () => {
  expect(() => gendiff(file1txt, file2txt)).toThrow(extensionErr);
});
