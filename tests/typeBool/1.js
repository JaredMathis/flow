
const u = require("wlj-utilities");

const typeBool = require("../../library/typeBool.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    let t = typeBool();
    u.assert(() => t.$type === 'typeBool');
});
