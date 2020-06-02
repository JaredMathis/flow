
const u = require("wlj-utilities");
const compileGetInMemoryStorage = require('./compileGetInMemoryStorage');

module.exports = compileGetInMemory;

const storage = compileGetInMemoryStorage();

function compileGetInMemory(location) {
    let result;
    u.scope(compileGetInMemory.name, x => {
        let log = false;
        if (log) console.log(compileGetInMemory.name + ' entered');
        let sLocation = location.join('');
        u.merge(x,{sLocation});
        u.assert(() => storage.hasOwnProperty(sLocation));
        let sValue = storage[sLocation];
        u.merge(x,{sValue});
        u.assert(() => u.isString(sValue));
        result = sValue.split('');
    });
    return result;
}
