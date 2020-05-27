
const u = require("wlj-utilities");
const { EOL } = require('os');

const compile = require("../../library/compile.js");
const defineSum = require("../../library/defineSum.js");
const defineAdd = require("../../library/defineAdd.js");
const compileAssertIsType = require("../../library/compileAssertIsType.js");
const compileAssertHasOwnProperty = require("../../library/compileAssertHasOwnProperty.js");

u.scope(__filename, x => {
    let compiles = [];

    function compileDefinition(fn, fns) {
        u.merge(x,{fn});
        let lines = compile(fn, fns);
        let compiled = lines.join(EOL);
        compiles.push(compiled);
        return compiled;
    }

    // Compile add so that when sum is called,
    // Add will be defined.
    compileDefinition(defineAdd(), []);
    compileDefinition(defineSum(), [defineAdd()]);

    function getEval() {
        return compiles.join(EOL);
    }

    try {
        // Basic sum should work
        eval(getEval());
        u.assert(() => sum({array:[]})['result'] === 0);
        u.assert(() => sum({array:[1]})['result'] === 1);
        eval(getEval());
        u.assert(() => sum({array:[2]})['result'] === 2);
        eval(getEval());
        u.assert(() => sum({array:[1,2]})['result'] === 3);
        eval(getEval());
        u.assert(() => sum({array:[2,2]})['result'] === 4);
        eval(getEval());
        u.assert(() => sum({array:[2,3]})['result'] === 5);
        eval(getEval());
        u.assert(() => sum({array:[1,2,3]})['result'] === 6);
    } catch (e) {
        u.loop(compiles, c => {
            console.log();
            console.log(c);
        })
        throw e;
    }
});
