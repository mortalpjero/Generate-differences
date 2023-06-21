#!/usr/bin/env node
import gendiff from '../src/index.js'

import { program } from "commander";
program
    .name('gendiff')
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2) => {
        console.log(gendiff(filepath1, filepath2));
    })
program.parse();
