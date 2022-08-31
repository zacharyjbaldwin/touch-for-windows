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

    .string('d').alias('d', 'date')

    .describe('a', 'change only the access time')
    .describe('d', 'specifies the date to use instead of the current time')
    .describe('h', 'toggles hidden attribute for a file. creates a hidden file if it does not exist')
    .describe('m', 'change only the modification time')
    .describe('help', 'display this help and exit')
    .describe('version', 'output version information and exit')

    .epilog('Note: The --date option accepts any value also accepted by the JavaScript Date object.')
    .argv;

const rawFilesInput = argv._;
let files = [];

if (rawFilesInput.length == 0) {
    console.log('No filename(s) specified');
    process.exit(1);
}

const re = /(^.*){(\d+)\.\.\.(\d+)}(.*)$/;
for (let file of rawFilesInput) {
    if (file.match(re) != null) {
        const parsed = file.match(re);
        for (let i = +parsed[2]; i <= +parsed[3]; i++) {
            files.push(newFile = parsed[1] + i + parsed[4]);
        }
    } else {
        files.push(file);
    }
}

let datetime = new Date();
if (argv.d) {
    datetime = new Date(argv.d);
    if (!(datetime instanceof Date) || isNaN(datetime.valueOf())) {
        console.log('Invalid date');
        process.exit(1);
    }
}

for (let file of files) {
    if (file.includes('\\') || file.includes('/') || file.includes(':') || file.includes('*') || file.includes('?') || file.includes('"') || file.includes('<') || file.includes('>') || file.includes('|')) {
        console.log(`Invalid file name: ${file}`);
        continue;
    }
    
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, '')
    }

    if (argv.a && argv.m || (!argv.a && !argv.m)) {
        fs.utimesSync(file, datetime, datetime);
    }

    if (argv.a && !argv.m) {
        fs.utimesSync(file, datetime, fs.statSync(file).mtime);
    }

    if (!argv.a && argv.m) {
        fs.utimesSync(file, fs.statSync(file).atime, datetime);
    }

    if (argv.h) {
        fswin.getAttributes(file, (attr) => {
            fswin.setAttributesSync(file, { IS_HIDDEN: !attr.IS_HIDDEN });
        });
    }
}
