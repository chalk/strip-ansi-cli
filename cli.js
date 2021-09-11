#!/usr/bin/env node
import process from 'node:process';
import meow from 'meow';
import stripAnsi from 'strip-ansi';
import getStdin from 'get-stdin';

const cli = meow(`
	Usage
	  $ strip-ansi <text>
	  $ echo <text> | strip-ansi

	Example
	  $ ls --color | strip-ansi
`, {
	importMeta: import.meta,
});

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
	(async () => {
		init(await getStdin());
	})();
}
