
const u = require("wlj-utilities");
const { EOL } = require('os');

const compile = require("../../library/compile.js");
const defineAdd = require("../../library/defineAdd.js");
const compileAssertIsType = require("../../library/compileAssertIsType.js");
const compileAssertHasOwnProperty = require("../../library/compileAssertHasOwnProperty.js");
const library = require('../../library/getLibrary')();

u.scope(__filename, x => {
    let syntax = defineAdd();
    let lines = compile(syntax, library);
    let text = lines.join(EOL);
    try {
        eval(text);

        // Basic sum should work
        let result = add({x:1, y:2});
        u.merge(x,{result});
        u.assert(() => result['result'] === 3);
        u.assert(() => add({x:2, y:2})['result'] === 4);
        u.assert(() => add({x:3, y:2})['result'] === 5);

        // Should not be able to add a string
        u.assert(() => u.throws(() => add({x:'a', y:2})['result'] === 3));
        u.assert(() => u.throws(() => add({x:'a', y:'b'})['result'] === 3));
        u.assert(() => u.throws(() => add({x:1, y:'b'})['result'] === 3));
    } catch (e) {
        console.log(text);
        throw e;
    }
});
