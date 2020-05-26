
const u = require("wlj-utilities");

const variable = require("../../library/variable.js");

u.scope(__filename, x => {
    // TODO test validation of arguments

    let actual = variable('a', 'int');
    let expected = {"name":"a","type":"int"};
    u.assertIsEqualJson(() => actual, () => expected);
});
