
const u = require("wlj-utilities");

module.exports = compileGetInMemoryStorage;

const storage = {};

function compileGetInMemoryStorage() {
    let result;
    u.scope(compileGetInMemoryStorage.name, x => {
        result = storage;
    });
    return result;
}
