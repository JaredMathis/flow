
const u = require("wlj-utilities");

module.exports = newText;

function newText(value) {
    let result;
    u.scope(newText.name, x => {
        u.merge(x, {value});
        u.assert(() => u.isString(value));
        
        result = {
            $type: 'newText',
            value,
        };
    });
    return result;
}
