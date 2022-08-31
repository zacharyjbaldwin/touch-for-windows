#!/usr/bin/env node

const fs = require('fs');
const fswin = require('fswin');

const argv = require('yargs/yargs')(process.argv.slice(2))
    .scriptName('touch')
    .usage('Usage: $0 [option] <filename>')
    .example('touch my-file.txt', 'change file timestamps')
    .help('help')
    .alias('v', 'version')

    .boolean('a')
    .boolean('h').alias('h', 'hidden')
    .boolean('m')

    .describe('a', 'change only the access time')
    .describe('h', 'toggles hidden attribute for a file. creates a hidden file if it does not exist')
    .describe('m', 'change only the modification time')
    .describe('help', 'display this help and exit')
    .describe('version', 'output version information and exit')
    .argv;

const FILES = argv._;
for (let FILENAME of FILES) {
    if (!FILENAME) {
        console.log('No filename specified. Use touch --help for usage.');
        process.exit(1);
    }
    if (!fs.existsSync(FILENAME)) {
        fs.writeFileSync(FILENAME, '')
    }
    if (argv.a && argv.m || (!argv.a && !argv.m && !argv.h)) {
        const now = new Date();
        fs.utimesSync(FILENAME, now, now);
    }
    if (argv.a && !argv.m) {
        fs.utimesSync(FILENAME, new Date(), fs.statSync(FILENAME).mtime);
    }
    if (!argv.a && argv.m) {
        fs.utimesSync(FILENAME, fs.statSync(FILENAME).atime, new Date());
    }
    if (argv.h) {
        fswin.getAttributes(FILENAME, (attr) => {
            fswin.setAttributesSync(FILENAME, { IS_HIDDEN: !attr.IS_HIDDEN });
        });
    }
}
