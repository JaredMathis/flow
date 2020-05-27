
const u = require("wlj-utilities");
const { EOL } = require('os');

const compile = require("../../library/compile.js");
const defineSum = require("../../library/defineSum.js");
const compileAssertIsType = require("../../library/compileAssertIsType.js");

u.scope(__filename, x => {
    let log = false;

    let syntax = defineSum();
    u.merge(x,{syntax});
    let lines = compile(syntax);
    let text = lines.join(EOL);
    if (log) console.log(text);
    eval(text);

    // Basic sum should work
    u.assert(() => sum([])['result'] === 0);
    u.assert(() => sum([1])['result'] === 1);
    u.assert(() => sum([1,2])['result'] === 3);
    u.assert(() => sum([1,2,3])['result'] === 6);
    u.assert(() => sum([2,3])['result'] === 5);
});
