import test from 'ava';
import {execa} from 'execa';

const fixture = '\u001B[0m\u001B[4m\u001B[42m\u001B[31mfoo\u001B[39m\u001B[49m\u001B[24mfoo\u001B[0m';

test('main', async t => {
	const {stdout} = await execa('./cli.js', [fixture]);
	t.is(stdout, 'foofoo');
});

test('stdin', async t => {
	const {stdout} = await execa('./cli.js', {input: fixture});
	t.is(stdout, 'foofoo');
});

test('no input', async t => {
	/** @type {import('execa').ExecaError} */
	const error = await t.throwsAsync(execa('./cli.js', {stdin: 'inherit'}));

	t.like(error, {
		stderr: 'Input required',
		exitCode: 1,
	});
});
