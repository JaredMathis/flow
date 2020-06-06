
const u = require("wlj-utilities");

const getAvailableVariables = require("../../library/getAvailableVariables.js");
const defineAdd = require("../../library/defineAdd.js");
const defineAverage = require("../../library/defineAverage.js");
const index = require("../../index.js");

u.scope(__filename, x => {
    let log = false;
    let actual = getAvailableVariables(defineAdd());
    if (log) console.log(actual);
    u.assertIsEqualJson(() => actual, () => [
        { name: 'x', type: { '$type': 'typeInt' } },
        { name: 'y', type: { '$type': 'typeInt' } },
        { name: 'result', type: { '$type': 'typeInt' } }
      ]);
    actual = getAvailableVariables(defineAverage());
    if (log) console.log(actual);
    u.assertIsEqualJson(() => actual, () => [
        { name: 'array', type: { '$type': 'typeList', nested: { '$type': 'typeInt' } } },
        { name: 'result', type: { '$type': 'typeInt' } },
        { name: 's', type: { '$type': 'typeInt' } },
        { name: 'c', type: { '$type': 'typeInt' } }
    ]);
});
