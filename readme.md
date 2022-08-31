# touch-for-windows

A lightweight Windows implementation of Unix's `touch` command written in Javascript. This package is built for Windows specifically, and likely will not work on other systems.

## Install

For users: `npm install -g touch-for-windows`

For developers: 
1. `git clone https://www.github.com/zacharyjbaldwin/touch-for-windows.git`
2. `cd touch-for-windows`
3. `npm install`

## Usage

`touch [option] <filename>`

### Options

| option | functionality |
| --- | --- |
| `-a` | change only the access time of a file |
| `-d`, `--date` | specifies the date to use when changing access and/or modification/write time (accepts any date string that can be used by the JavaScript Date object
| `-h`, `--hidden` | hide/unhide a file or create a hidden file if it doesn't exist
| `-m` | change only the modification/write time of a file |
| `-v`, `--version` | output version information and exit | 
| `--help` | display help page |

## Special Formatting

For creating mutliple files with successive numbering, you can use a shortcut like this:

`touch my-file{0...3}.txt`

This command will create `my-file0.txt`, `my-file1.txt`, `my-file2.txt`, and `my-file3.txt`.

All files will have the same attributes based on the flags provided to the command.

## Examples

Touch a file: `touch my-file.txt`

Change only the access time: `touch -a my-file.txt`

Change only the modification/write time: `touch -m my-file.txt`

Change both access time and modification/write time: `touch -am my-file.txt` (this is the same behavior as simply `touch my-file.txt`)

Toggle hidden attribute of a file: `touch -h my-file.txt` (hides/unhides a file if it exists or creates a hidden file if it does not)

Touch multiple files: `touch my-file.txt package.json another-file.js`

Manually specify the date to use: `touch -d="8/25/2054 6:35:56 AM" my-file.txt`

Using multiple flags together: `touch -amh -d="5/4/2020" my-file.txt`

Creating multiple files: `touch my-file{0...5}.txt`

## License

Copyright 2022 Zachary Baldwin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.