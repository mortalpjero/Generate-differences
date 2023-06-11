#!/usr/bin/env node

import { program } from "commander";
program
    .name('gendiff')
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
program.parse();