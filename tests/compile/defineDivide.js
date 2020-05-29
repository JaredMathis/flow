
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
