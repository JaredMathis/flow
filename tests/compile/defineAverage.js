
const u = require("wlj-utilities");
const { EOL } = require('os');

const compile = require("../../library/compile.js");
const defineSum = require("../../library/defineSum.js");
const defineAdd = require("../../library/defineAdd.js");
const defineCount = require("../../library/defineCount.js");
const defineAverage = require("../../library/defineAverage.js");
const defineDivide = require("../../library/defineDivide.js");
const compileAssertIsType = require("../../library/compileAssertIsType.js");
const compileAssertHasOwnProperty = require("../../library/compileAssertHasOwnProperty.js");
const library = require('../../library/getLibrary')();

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
    compileDefinition(defineAdd(), library);
    compileDefinition(defineDivide(), library);
    compileDefinition(defineSum(), library);
    compileDefinition(defineCount(), library);
    compileDefinition(defineAverage(), library);

    function getEval() {
        return compiles.join(EOL);
    }

    try {
        // For some reason, sum needs to be re-defined
        // hence eval-ing... before the calls.
        eval(getEval());
        let result;
        result = average({list:[1]})['result'];
        u.assert(() => result === 1);
        eval(getEval());
        result = average({list:[2]});
        u.merge(x,{result})
        u.assert(() => result['result'] === 2);
        eval(getEval());
        u.assert(() => average({list:[1,2]})['result'] === 1);
        eval(getEval());
        u.assert(() => average({list:[2,2]})['result'] === 2);
        eval(getEval());
        u.assert(() => average({list:[2,3]})['result'] === 2);
        eval(getEval());
        u.assert(() => average({list:[1,2,3]})['result'] === 2);
        
        // You cannot average an empty array.
        u.assertThrows(() => average({list:[]}));
    } catch (e) {
        u.loop(compiles, c => {
            console.log();
            console.log(c);
        })
        throw e;
    }
});
