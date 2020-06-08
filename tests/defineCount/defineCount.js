
const u = require("wlj-utilities");

const defineCount = require("../../library/defineCount.js");

u.scope(__filename, x => {
    let log = false;

    let count = defineCount();
    
    let expected = require('./expected');
    try {
        u.assertIsEqualJson(() => count, () => expected);
    } catch (e) {
        console.log(JSON.stringify(count, null, 2));
        throw e;
    }
});
