
const u = require("wlj-utilities");

const defineAdd = require("../../library/defineAdd.js");

u.scope(__filename, x => {
    let log = false;

    let add = defineAdd();
    if (log) console.log(JSON.stringify(add, null, 2));
    
    let expected = require('./expected');
    u.assertIsEqualJson(() => add, () => expected);
});
