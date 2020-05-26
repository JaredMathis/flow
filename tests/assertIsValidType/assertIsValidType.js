
const u = require("wlj-utilities");

const assertIsValidType = require("../../library/assertIsValidType.js");

u.scope(__filename, x => {
    assertIsValidType('int', ['int', 'char']);
    u.assert(() => u.throws(() => assertIsValidType('invalid', ['int', 'char'])));
});
