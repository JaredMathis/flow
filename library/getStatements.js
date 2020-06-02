
const u = require("wlj-utilities");

module.exports = getStatements;

/**
 * Returns the different root statements that need handling.
 */
function getStatements() {
    let result;
    u.scope(getStatements.name, x => {
        result = [
            'block',
            'evaluate',
            'execute',
            'loop',
            'set',
            'steps',
        ]
    });
    return result;
}
