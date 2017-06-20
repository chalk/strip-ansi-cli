#!/usr/bin/env node
'use strict';
const meow = require('meow');
const stripAnsi = require('strip-ansi');

const cli = meow(`
	Usage
	  $ strip-ansi <text>
	  $ echo <text> | strip-ansi

	Example
	  $ ls --color | strip-ansi
`);

const input = cli.input[0];

function init(data) {
	process.stdout.write(stripAnsi(data));
}

if (!input && process.stdin.isTTY) {
	console.error('Input required');
	process.exit(1);
}

if (input) {
	init(input);
} else {
	process.stdin.setEncoding('utf8');
	process.stdin.on('data', init);
}
