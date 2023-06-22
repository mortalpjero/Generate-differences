import { expect } from 'expect';
import test from 'node:test';
import gendiff from '../src/index.js';
import readFile from '../src/readFile.js';

const result1Plain = readFile('test1OutputDefault.txt');
const result2Plain = readFile('test2OutputDefault.txt');
const file1 = 'file1.json';
const file2 = 'file2.json';

test('generate difference for JSON First Test', () => {
  expect(gendiff(file2, file1)).toEqual(result2Plain);
});

test('generate difference for JSON Second Test', () => {
  expect(gendiff(file1, file2)).toEqual(result1Plain);
});
