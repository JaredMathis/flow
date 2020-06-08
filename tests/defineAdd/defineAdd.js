
const u = require("wlj-utilities");

const defineAdd = require("../../library/defineAdd.js");

u.scope(__filename, x => {
    let log = false;

    let add = defineAdd();
    
    let expected = require('./expected');
    try {
        u.assertIsEqualJson(() => add, () => expected);
    } catch (e) {
        console.log(JSON.stringify(add, null, 2));
        throw e;
    }
});
