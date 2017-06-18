'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
// taken from: https://github.com/facebookincubator/create-react-app/tree/master/packages/react-scripts/scripts#L19
process.on('unhandledRejection', (err) => {
  throw err;
});

const chalk = require('chalk');
const path = require('path');
const fse = require('fs-extra');
const Promise = require('bluebird');
const { spawn } = require('child_process');

const GLOBAL_ERR_STATUS = 1;
const BAD_CONF_STATUS = 2;
const MISSING_DEP_STATUS = 3;
const packageJSON = require('../package.json');
const ignoredDep = packageJSON.dllIgnore;
const destPath = path.resolve(__dirname, 'dll');
const nodeModules = path.resolve(__dirname, '..', 'node_modules');
const vendorsLibPath = path.resolve(destPath, 'vendors.js');
const prevDepPath = path.resolve(destPath, 'previous-dependencies.txt');

if (ignoredDep !== undefined && !Array.isArray(ignoredDep)) {
  console.log(`dllIgnore should be an Array : [${chalk.red('ERROR')}]`);
  process.exit(BAD_CONF_STATUS);
}

if (packageJSON.dependencies === undefined) {
  noDependencies();
}

const dependencies = Object
  .keys(packageJSON.dependencies)
  .filter(dep => !(ignoredDep !== undefined && ignoredDep.includes(dep)));

if (dependencies.length === 0) {
  noDependencies();
}

const ensureDepsPromise = dependencies
  .map((dep) => {
    const depPath = path.resolve(nodeModules, dep);
    return fse.pathExists(depPath);
  });

Promise.all(ensureDepsPromise)
  .then((areDepPresent) => {
    const isNotPresent = areDepPresent.some(isPresent => !isPresent);
    if (isNotPresent === true) {
      console.warn(chalk.yellow(`
        Some dependencies are not installed.\n
        Please run npm install.`)
      );
      process.exit(MISSING_DEP_STATUS);
    }
  })
  .then(() => fse.ensureFile(prevDepPath))
  .then(() => fse.readFile(prevDepPath, 'utf8'))
  .then((prevDep) => {
    const currentDep = JSON.stringify(dependencies);

    if (currentDep === prevDep) {
      console.log(chalk.yellow('Dependencies have not changed'));
      console.log(`DLL build: [${chalk.yellow('ABORT')}]`);
      process.exit(0);
    }

    return fse.outputFile(prevDepPath, currentDep);
  })
  .then(() => {
    console.log(`Updated previous dependencies file: [${chalk.green('OK')}]`);
    return fse.ensureFile(vendorsLibPath);
  })
  .then(() => fse.readFile(vendorsLibPath, 'utf8'))
  .then((vendorsContent) => {
    let textBeforeLabel = '';
    if (vendorsContent) {
      const posLabel = vendorsContent.indexOf('// LIST DEP START -- DO NOT DELETE');
      textBeforeLabel = vendorsContent.substring(0, posLabel);
    } else {
      textBeforeLabel = `/**
 * This file lists all the external dependencies that are used in the project
 * to create a dll file for these vendors dependencies. ==> fast build !
 */
'use strict';

// LIST DEP START -- DO NOT DELETE`;
    }

    const content = dependencies.reduce((list, dep) => `${list}\nrequire('${dep}');`, `${textBeforeLabel}`);
    return fse.outputFile(vendorsLibPath, content);
  })
  .then(() => {
    console.log(`Vendors script updated: [${chalk.green('OK')}]`);
    console.log(chalk.green('\nStarting webpack DLL build ...'));

    const buildDll = spawn('npm', ['run', 'build:dll']);
    return new Promise((resolve, reject) => {
      buildDll.stdout.on('data', (data) => console.log(data.toString('utf8')));
      buildDll.stderr.on('data', (data) => console.log(data.toString('utf8')));
      buildDll.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`DLL built: [${chalk.red('ERROR')}]`));
        } else {
          resolve();
        }
      });
      buildDll.on('error', reject);
    });
  })
  .then(() => console.log(`DLL built: [${chalk.green('OK')}]`))
  .catch((err) => {
    console.error(err);
    process.exit(GLOBAL_ERR_STATUS);
  });


function noDependencies() {
  console.log(chalk.yellow('No dependencies in package.json'));
  console.log(`DLL build: [${chalk.yellow('ABORT')}]`);
  process.exit(0);
}
