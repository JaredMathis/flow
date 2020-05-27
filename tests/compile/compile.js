
const u = require("wlj-utilities");
const { EOL } = require('os');

const compile = require("../../library/compile.js");
const defineAdd = require("../../library/defineAdd.js");
const defineSum = require("../../library/defineSum.js");
const compileAssertIsType = require("../../library/compileAssertIsType.js");

u.scope(__filename, x => {
    let log = false;

    let syntax = defineAdd();
    let lines = compile(syntax);
    let text = lines.join(EOL);
    if (log) console.log({text});
    eval(text);

    // Basic sum should work
    u.assert(() => add(1, 2)['sum'] === 3);

    // Should not be able to add a string
    u.assert(() => u.throws(() => add('a', 2)['sum'] === 3));
    u.assert(() => u.throws(() => add('a', 'b')['sum'] === 3));
    u.assert(() => u.throws(() => add(1, 'b')['sum'] === 3));

    syntax = defineSum();
    lines = compile(syntax);
    text = lines.join(EOL);
    if (log) console.log(text);
    eval(text);

    // Basic sum should work
    u.assert(() => sum([])['result'] === 0);
    u.assert(() => sum([1])['result'] === 1);
    u.assert(() => sum([1,2])['result'] === 3);
    u.assert(() => sum([1,2,3])['result'] === 6);
    u.assert(() => sum([2,3])['result'] === 5);
});
