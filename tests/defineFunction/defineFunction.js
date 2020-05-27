
const u = require("wlj-utilities");

const defineFunction = require("../../library/defineFunction.js");
const evaluate = require("../../library/evaluate.js");
const variable = require("../../library/variable.js");
const typeInt = require("../../library/typeInt.js");

u.scope(__filename, x => {
    // TODO

    // Input cannot contain duplicate names
    u.assertThrows(() => defineFunction('functionName', [
        variable('a', typeInt()),
        variable('a', typeInt()),
    ], [

    ], evaluate(";")));

    // Output cannot contain duplicate names
    u.assertThrows(() => defineFunction('functionName', [

    ], [

    ], evaluate(";")));
});
