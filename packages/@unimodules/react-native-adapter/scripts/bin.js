#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');

const configureIOS = require('./configureIOS');
const configureAndroid = require('./configureAndroid');
const { findProjectRootDirAsync } = require('./tools');

async function main() {
  try {
    const packageDir = path.dirname(__dirname); // eslint-disable-line
    const rootDir = await findProjectRootDirAsync(path.dirname(packageDir));

    await configureAndroid(rootDir);
    await configureIOS(rootDir);

    process.exit(0);
  } catch (error) {
    const stack = error.stack.split(/\n/g);

    console.error(chalk.red(stack.shift()));
    stack.forEach(s => console.error(chalk.yellow(s)));
  }
  process.exit(1);
}

main();
