
const u = require("wlj-utilities");

module.exports = getStatements;

/**
 * Returns the different statements that need handling.
 */
function getStatements() {
    let result;
    u.scope(getStatements.name, x => {
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
