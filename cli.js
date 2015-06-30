#!/usr/bin/env node
'use strict';
var meow = require('meow');
var stripAnsi = require('strip-ansi');

var cli = meow({
	help: [
		'Usage',
		'  $ strip-ansi <string>',
		'  $ echo <string> | strip-ansi',
		'',
		'Example',
		'  $ ls --color | strip-ansi'
	]
});

var input = cli.input[0];

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
