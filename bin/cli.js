#!/usr/bin/env node
'use strict';

var fs = require('fs');
var yargs = require('yargs');
var args = yargs.argv;

if (args._.length >= 1) {
    var filenames = args._;
    filenames.forEach((item) => {
        fs.writeFile(item, '', (error) => {
            if (error) {
                console.log('There was an error creating the given file:');
                console.log(error);
            } else {
                console.log(`Successfully created '${item}'`);
            }
        });
    });
} else {
    console.error('Please provide a file name!');
}