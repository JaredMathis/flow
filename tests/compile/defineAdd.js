
const u = require("wlj-utilities");
const { EOL } = require('os');

const compile = require("../../library/compile.js");
const defineAdd = require("../../library/defineAdd.js");
const defineSum = require("../../library/defineSum.js");
const compileAssertIsType = require("../../library/compileAssertIsType.js");
const compileAssertHasOwnProperty = require("../../library/compileAssertHasOwnProperty.js");

u.scope(__filename, x => {
    let log = false;

    let syntax = defineAdd();
    let lines = compile(syntax, []);
    let text = lines.join(EOL);
    try {
        eval(text);

        // Basic sum should work
        let result = add({x:1, y:2});
        u.merge(x,{result});
        u.assert(() => result['sum'] === 3);
        u.assert(() => add({x:2, y:2})['sum'] === 4);
        u.assert(() => add({x:3, y:2})['sum'] === 5);

        // Should not be able to add a string
        u.assert(() => u.throws(() => add({x:'a', y:2})['sum'] === 3));
        u.assert(() => u.throws(() => add({x:'a', y:'b'})['sum'] === 3));
        u.assert(() => u.throws(() => add({x:1, y:'b'})['sum'] === 3));
    } catch (e) {
        console.log(text);
        throw e;
    }
});
