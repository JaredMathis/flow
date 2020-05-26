
const u = require("wlj-utilities");

const getTypesPath = require("../../library/getTypesPath.js");

u.scope(__filename, x => {
    let actual = getTypesPath();
    let expected = './types.json';
    u.merge(x, {actual});
    u.merge(x, {expected});
    u.assert(() => actual === expected);
});
