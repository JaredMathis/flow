
const u = require("wlj-utilities");
const { EOL } = require('os');

const compile = require("../../library/compile.js");
const compileAssertIsType = require("../../library/compileAssertIsType.js");
const compileAssertHasOwnProperty = require("../../library/compileAssertHasOwnProperty.js");
const library = require('../../library/getLibrary')();
const compileAndTest = require('./compileAndTest');

require('./defineAdd');
require('./defineDivide');
require('./defineSum');
require('./defineCount');
require('./defineAverage');

function test(path) {
    u.scope(__filename, x => {
        u.scope(test.name, x => {
            compileAndTest((text) => {
                eval(text);

                let parsed = require(path);
                u.merge(x, () => parsed.name);
                let actual;
                try {
                    eval(`actual = ${parsed.name}(${JSON.stringify(parsed.input)})`);
                } catch (e) {
                    console.log(text);
                    throw e;
                }

                u.assertIsEqualJson(() => actual, () => parsed.output);
            });
        });
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
test("./multiply2.json");
test("./multiply3.json");
test("./multiply4.json");
test("./multiply5.json");
test("./multiply6.json");
test("./multiply7.json");
test("./multiply8.json");
test("./multiply9.json");
test("./subtract.json");
test("./subtract2.json");
test("./subtract3.json");
test("./subtract4.json");
test("./subtract5.json");
test("./subtract6.json");
test("./subtract7.json");
test("./subtract8.json");
test("./mod.json");
test("./mod2.json");
test("./mod3.json");
test("./mod4.json");
test("./mod5.json");
test("./mod6.json");