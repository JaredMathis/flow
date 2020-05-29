
const u = require("wlj-utilities");
const { EOL } = require('os');

const compile = require("../../library/compile.js");
const compileAssertIsType = require("../../library/compileAssertIsType.js");
const compileAssertHasOwnProperty = require("../../library/compileAssertHasOwnProperty.js");
const library = require('../../library/getLibrary')();

require('./defineAdd');
require('./defineDivide');
require('./defineSum');
require('./defineCount');
require('./defineAverage');

function test(path) {
    u.scope(test.name, x => {
        let parsed = require(path);

        let compiles = [];
    
        function compileDefinition(fn, fns) {
            u.merge(x,{fn});
            let lines = compile(fn, fns);
            let compiled = lines.join(EOL);
            compiles.push(compiled);
            return compiled;
        }
    
        u.loop(library, l => compileDefinition(l, library));

        let text = compiles.join(EOL);
        eval(text);

        let actual;
        eval(`actual = ${parsed.name}(${JSON.stringify(parsed.input)})`);

        u.assertIsEqualJson(() => actual, () => parsed.output);
    });
}

test("./add.json");
test("./add2.json");
test("./add3.json");
test("./add4.json");
test("./add5.json");
test("./add6.json");
test("./add7.json");