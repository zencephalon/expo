#!/usr/bin/env node

const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const fs = require('fs-extra');
const inquirer = require('inquirer');

async function findProjectRootDirAsync(dir) {
  const packageJsonPath = path.join(dir, 'package.json');
  return (await fs.pathExists(packageJsonPath)) ? dir : findProjectRootDirAsync(path.dirname(dir));
}

async function globAsync(cwd, pattern, customOptions = {}) {
  const options = {
    cwd,
    ignore: ['**/node_modules/**'],
    nodir: true,
    ...customOptions,
  };

  return new Promise((resolve, reject) => {
    glob(pattern, options, (err, matches) => {
      if (err) reject(err);
      else resolve(matches);
    });
  });
}

async function findNativeProjectAsync(rootDir, globPattern, platform) {
  const dirs = (await globAsync(rootDir, globPattern))
    .map(file => file.split('/'))
    .sort((a, b) => a.length - b.length)
    .map(chunks => path.dirname(chunks.join('/')));

  if (dirs.length === 1) {
    return path.join(rootDir, dirs[0]);
  }
  if (dirs.length) {
    const { projectDir } = await inquirer.prompt([
      {
        type: 'list',
        name: 'projectDir',
        message: `Which ${chalk.blue(platform)} project you wish to configure 🤔?`,
        choices: dirs,
      },
    ]);
    return path.join(rootDir, projectDir);
  }
  return null;
}

async function transformFile(filePath, transformer) {
  const content = await fs.readFile(filePath, 'utf8');
  const newContent = await transformer(content);

  // Returning `null` or nothing stops the transformation and nothing will be written to the file.
  if (newContent != null) {
    console.log(chalk.yellow(filePath), chalk.gray(':'));
    console.log(chalk.green(newContent));
    // await fs.outputFile(filePath, newContent);
  }
}

module.exports = { findProjectRootDirAsync, findNativeProjectAsync, globAsync, transformFile };
