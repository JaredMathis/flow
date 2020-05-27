
const u = require("wlj-utilities");

module.exports = getRoots;

/**
 * Returns the different root statements that need handling.
 */
function getRoots() {
    let result;
    u.scope(getRoots.name, x => {
        result = [
            'evaluate',
            'execute',
            'loop',
            'set',
            'steps',
        ]
    });
    return result;
}
