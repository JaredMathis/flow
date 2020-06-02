
const u = require("wlj-utilities");
const compileGetInMemoryStorage = require('./compileGetInMemoryStorage')

module.exports = compileSetInMemory

const storage = compileGetInMemoryStorage();

function compileSetInMemory(location, value) {
    let result;
    u.scope(compileSetInMemory.name, x => {
        let log = false;
        if (log) console.log(compileSetInMemory.name + ' entered');
        let sLocation = location.join('');
        let sValue = value.join('');
        u.merge(x,{sLocation});
        u.merge(x,{sValue});
        u.assert(() => !storage.hasOwnProperty(sLocation));
        storage[sLocation] = sValue;
        if (log) console.log(compileSetInMemory.name, {storage});
    });
    return result;
}
