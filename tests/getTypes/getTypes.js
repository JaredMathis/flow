
const u = require("wlj-utilities");

const getTypes = require("../../library/getTypes.js");

u.scope.prototype.log = true;
u.scope(__filename, x => {
    let actual = getTypes();
    u.merge(x, {actual})
    u.assertIsEqualJson(() => actual, ['int','char'])
});
