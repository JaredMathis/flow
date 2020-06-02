
const u = require("wlj-utilities");
const { EOL } = require('os');

const compile = require("../../library/compile.js");
const defineGet = require("../../library/defineGet.js");
const defineSet = require("../../library/defineSet.js");
const compileAssertIsType = require("../../library/compileAssertIsType.js");
const compileAssertHasOwnProperty = require("../../library/compileAssertHasOwnProperty.js");
const library = require('../../library/getLibrary')();

u.scope(__filename, x => {
    let syntax = defineAdd();
    let lines = compile(syntax, library);
    let text = lines.join(EOL);
    try {
        eval(text);

        // Should not be able to add a string
        u.assert(() => u.throws(() => add({x:'a', y:2})['result'] === 3));
        u.assert(() => u.throws(() => add({x:'a', y:'b'})['result'] === 3));
        u.assert(() => u.throws(() => add({x:1, y:'b'})['result'] === 3));
    } catch (e) {
        console.log(text);
        throw e;
    }
});
