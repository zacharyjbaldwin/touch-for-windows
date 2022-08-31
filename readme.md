# touch-for-windows

A Windows implementation of Unix's `touch` command written in Javascript. This package is built for Windows specifically, and likely will not work on other systems.

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
| `-h`, `--hidden` | hide/unhide a file or create a hidden file if it doesn't exist
| `-m` | change only the modification/write time of a file |
| `-v`, `--version` | output version information and exit | 
| `--help` | display help page |

## Examples

Touch a file: `touch my-file.txt`

Change only the access time: `touch -a my-file.txt`

Change only the modification/write time: `touch -m my-file.txt`

Change both access time and modification/write time: `touch -am my-file.txt` (this is the same behavior as simply `touch my-file.txt`)

Toggle hidden attribute of a file: `touch -h my-file.txt` (hides/unhides a file if it exists or creates a hidden file if it does not)

Touch multiple files: `touch my-file.txt package.json another-file.js`