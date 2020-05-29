
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
        u.merge(x, ()=>library.length);
        let parsed = require(path);

        let compiles = [];    
        u.loop(library, fn => {
            u.merge(x,{fn});
            let lines = compile(fn, library);
            let compiled = lines.join(EOL);
            compiles.push(compiled);
        });
        u.merge(x, ()=>compiles.length);

        let text = compiles.join(EOL);
        eval(text);

        let actual;
        try {
            eval(`actual = ${parsed.name}(${JSON.stringify(parsed.input)})`);
        } catch (e) {
            console.log(text);
            throw e;
        }

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
test("./divide.json");
test("./divide2.json");
test("./divide3.json");
test("./divide4.json");
test("./divide5.json");
test("./divide6.json");
test("./divide7.json");
test("./multiply.json");