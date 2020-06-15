
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
require('./defineGetAndSet');

const tests = require('../getTests');
u.loop(tests, t=> test(t));

function test(parsed) {
    u.scope(__filename, x => {
        u.scope(test.name, x => {
            compileAndTest((text) => {
                eval(text);

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