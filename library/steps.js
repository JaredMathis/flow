
const u = require("wlj-utilities");

module.exports = steps;

function steps(s) {
    let result;
    u.scope(steps.name, x => {
        u.assert(() => u.isArray(s));
        
        result = {
            $type: "steps",
            steps: s
        }
    });
    return result;
}
