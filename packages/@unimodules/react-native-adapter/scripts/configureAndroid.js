#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const inquirer = require('inquirer');

const { findNativeProjectAsync, transformFile, globAsync } = require('./tools');

const OLD_IMPORT_REGEXP = /apply\s+from:\s+['"][^'"]+\/react-native-unimodules\/gradle\.groovy['"]/g;
const NEW_IMPORT_REGEXP = /apply\s+from:\s+['"][^'"]+\/react-native-adapter\/autolinking\.gradle['"]/g;
const OLD_METHOD_REGEXP = /includeUnimodulesProjects/g;

const AUTOLINKING_GRADLE_PATH = path.join(__dirname, 'autolinking.gradle'); // eslint-disable-line

async function configure({ rootDir, nativeProjectDir }) {
  const transformedSettingsGradle = await configureSettingsGradle(nativeProjectDir, rootDir);

  if (transformedSettingsGradle) {
    // console.log(chalk.green(transformedSettingsGradle));
    // const pathToImport = settingsGradlePath.
    // await fs.writeFileAsync(settingsGradlePath, settingsGradleContents);
  }
}

async function configureSettingsGradle(nativeProjectDir, rootDir) {
  await transformFile(getSettingsGradlePath(nativeProjectDir), async originalContent => {
    console.log(chalk.yellow(originalContent));

    const includeMethodString = 'unimodules.includeProjects';
    const needsTransforming =
      !NEW_IMPORT_REGEXP.test(originalContent) && !originalContent.includes(includeMethodString);

    if (needsTransforming) {
      const stringToAddArray = [
        '// Apply unimodules autolinking script and include all unimodules as local projects.',
        getNewStyleImportString(nativeProjectDir),
        `${includeMethodString}()`,
      ];

      console.log(
        chalk.cyan(
          `File ${chalk.yellow(
            'settings.gradle'
          )} doesn't seem to be configured, we can add these lines at the end:\n`
        )
      );

      // Print lines to add.
      console.log(chalk.gray(stringToAddArray[0]));
      stringToAddArray.slice(1).map(str => console.log(chalk.green(str)));
      console.log();

      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `Do you want us to add these lines to ${chalk.yellow('settings.gradle')}?`,
        },
      ]);

      if (confirm) {
        return `${originalContent}\n\n${stringToAddArray.join('\n')}\n`;
      }
      console.log(chalk.red('Configuring Android project has been declined. 🛑'));
    } else {
      console.log(
        chalk.cyan(
          `Android project under ${chalk.yellow(
            path.relative(rootDir, nativeProjectDir)
          )} is already configured. ✅`
        )
      );
    }
    return null;
  });
}

/* Autolinking v1 -> v2 migration */

function canMigrate(settingsGradleContent) {
  return (
    OLD_IMPORT_REGEXP.test(settingsGradleContent) || OLD_METHOD_REGEXP.test(settingsGradleContent)
  );
}

async function migrate(nativeProjectDir) {
  await migrateMainApplication(nativeProjectDir);
  // await migrateSettingsGradle(nativeProjectDir);
}

async function migrateSettingsGradle(nativeProjectDir) {
  await transformFile(getSettingsGradlePath(nativeProjectDir), async originalContent => {
    console.log(
      chalk.cyan(
        `\nDetected an old version of autolinking - it's been moved from ${chalk.green(
          'react-native-unimodules'
        )} to ${chalk.green(
          '@unimodules/react-native-adapter'
        )} package and made much easier to set up.\nNow the configuration takes place only in ${chalk.yellow(
          'settings.gradle'
        )} file.\n`
      )
    );

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'We can migrate it the new version for you. Do you want to proceed?',
      },
    ]);

    if (confirm) {
      return originalContent
        .replace(OLD_IMPORT_REGEXP, getNewStyleImportString(nativeProjectDir))
        .replace(/includeUnimodulesProjects/g, 'unimodules.includeProjects');
    } else {
      console.log(chalk.red("Migrating Android's autolinking has been declined. 🛑"));
    }
    return null;
  });
}

async function migrateMainApplication(nativeProjectDir) {
  const mainApplicationFiles = await globAsync(nativeProjectDir, '**/MainApplication.@(java|kt)');

  if (mainApplicationFiles.length === 0) {
    console.error(chalk.red('MainApplication file cannot be found 😔.'));
    return;
  }

  // This `for` is kinda dumb, because there shouldn't be more than one MainApplication file,
  // but we iterate through all of them just in case.
  for (const mainApplicationFile of mainApplicationFiles) {
    const absolutePath = path.join(nativeProjectDir, mainApplicationFiles[0]);

    await transformFile(absolutePath, async originalContent => {
      let content = originalContent;
      console.log(chalk.green(content));

      // RegExp that matches only uses of those classes - [^.] at the beginning excludes imports.
      const assertRegExp = /[^.](ReactModuleRegistryAdapter|ModuleRegistryAdapter|BasePackageList)\W/;

      // Don't transform if those classes are not being used in `MainApplication` code.
      if (!assertRegExp.test(content)) {
        return null;
      }

      const unimodulesImportsRegExp = /[ \t]*import[ \t]+org\.unimodules\.adapters\.react\.(ReactModuleRegistryProvider|ModuleRegistryAdapter);?\n/g;
      const basePackageImportRegExp = /[ \t]*import[ \t]+[\w.]+\.generated\.BasePackageList[ \t];?\n/g;
      const providerDefinitionRegExp = /[ \t]+[^\n]+\bReactModuleRegistryProvider\b.+=\s*new ReactModuleRegistryProvider\(\s*new BasePackageList\(\)\.getPackageList\(\),\s*null\s*\);(\n[ \t]*\n)?/;
      const addAdapterPackageRegExp = /[ \t]*\w+\.add\(\s*new\s+ModuleRegistryAdapter\(\w+\)\);\n?/;

      // If file's content doesn't match our patterns then log this fact and don't transform.
      if (!providerDefinitionRegExp.test(content) || !addAdapterPackageRegExp.test(content)) {
        console.log(
          chalk.red(
            `Looks like ${chalk.yellow(
              mainApplicationFile
            )} contains some custom configuration so we couldn't migrate it.`
          )
        );
        return null;
      }

      // Remove registry provider definition and the place where we're adding the adapter package to RN packages.
      content = content.replace(providerDefinitionRegExp, '').replace(addAdapterPackageRegExp, '');

      // Remove imports only when adapter's classes are now not being used.
      if (!assertRegExp.test(content)) {
        content = content.replace(unimodulesImportsRegExp, '').replace(basePackageImportRegExp, '');
      }

      return content;
    });
  }
}

/* helpers */

function getNewStyleImportString(nativeProjectDir) {
  return `apply from: '${path.relative(nativeProjectDir, AUTOLINKING_GRADLE_PATH)}'`;
}

function getSettingsGradlePath(nativeProjectDir) {
  return path.join(nativeProjectDir, 'settings.gradle');
}

/* exports */

module.exports = async function(rootDir) {
  const nativeProjectDir = await findNativeProjectAsync(rootDir, '**/settings.gradle', 'Android');

  if (nativeProjectDir) {
    const settingsGradlePath = getSettingsGradlePath(nativeProjectDir);
    const settingsGradleContent = await fs.readFile(settingsGradlePath, 'utf8');

    if (canMigrate(settingsGradleContent)) {
      await migrate(nativeProjectDir);
    } else {
      await configure({ rootDir, nativeProjectDir });
    }
  } else {
    console.error(
      chalk.red(
        `No Android project found. If that's wrong, please make sure you have ${chalk.yellow(
          'settings.gradle'
        )} file in the root Android project folder.`
      )
    );
  }
};
