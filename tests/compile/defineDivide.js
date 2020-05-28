
const u = require("wlj-utilities");
const { EOL } = require('os');

const compile = require("../../library/compile.js");
const defineDivide = require("../../library/defineDivide.js");
const compileAssertIsType = require("../../library/compileAssertIsType.js");
const compileAssertHasOwnProperty = require("../../library/compileAssertHasOwnProperty.js");
const library = require('../../library/getLibrary')();

u.scope(__filename, x => {
    let syntax = defineDivide();
    let lines = compile(syntax, library);
    let text = lines.join(EOL);
    try {
        eval(text);

        // Basic sum should work
        u.assert(() => divide({x:1, y:1})['result'] === 1);
        u.assert(() => divide({x:1, y:2})['result'] === 0);
        u.assert(() => divide({x:2, y:2})['result'] === 1);
        u.assert(() => divide({x:2, y:3})['result'] === 0);
        u.assert(() => divide({x:6, y:3})['result'] === 2);
        u.assert(() => divide({x:8, y:3})['result'] === 2);
        u.assert(() => divide({x:9, y:3})['result'] === 3);

        // Should not be able to divde a string
        u.assertThrows(() => divide({x:'a', y:2}));
        u.assertThrows(() => divide({x:'a', y:'b'}));
        u.assertThrows(() => divide({x:1, y:'b'}));

        // Should not be able to divide by zero
        u.assertThrows(() => divide({x:0, y:0}));
        u.assertThrows(() => divide({x:-1, y:0}));
        u.assertThrows(() => divide({x:1, y:0}));
    } catch (e) {
        console.log(text);
        throw e;
    }
});
