'use strict';
const test = require('ava');
const execa = require('execa');

test('main', async t => {
	const {stdout} = await execa('./cli.js', ['--version']);
	t.true(stdout.length > 0);
});

test('stdin', async t => {
	const {stdout} = await execa('./cli.js', {
		input: '\u001B[0m\u001B[4m\u001B[42m\u001B[31mfoo\u001B[39m\u001B[49m\u001B[24mfoo\u001B[0m'
	});
	t.is(stdout, 'foofoo');
});
