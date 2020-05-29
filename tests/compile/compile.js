
const u = require("wlj-utilities");
const { EOL } = require('os');

const compile = require("../../library/compile.js");
const defineAdd = require("../../library/defineAdd.js");
const defineSum = require("../../library/defineSum.js");
const compileAssertIsType = require("../../library/compileAssertIsType.js");
const library = require('../../library/getLibrary')();

require('./defineAdd');
require('./defineDivide');
require('./defineSum');
require('./defineCount');
require('./defineAverage');

function test(path) {
    let parsed = require(path);

    let definition = u.arraySingle(library, {name:parsed.name});
    u.assert(() => u.isDefined(definition));

    
}

test("./add.json");