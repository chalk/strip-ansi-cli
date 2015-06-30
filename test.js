'use strict';
var test = require('ava');
var childProcess = require('child_process');

test('main', function (t) {
	t.plan(2);

	childProcess.execFile('./cli.js', ['--version'], {cwd: __dirname}, function (err, stdout) {
		t.assert(!err, err);
		t.assert(stdout.trim().length > 0);
	});
});

test('stdin', function (t) {
	t.plan(1);

	childProcess.exec('echo \'\u001b[0m\u001b[4m\u001b[42m\u001b[31mfoo\u001b[39m\u001b[49m\u001b[24mfoo\u001b[0m\' | ./cli.js', function (err, stdout) {
		t.assert(stdout === 'foofoo\n');
	});
});
