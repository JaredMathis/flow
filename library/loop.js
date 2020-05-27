
const u = require("wlj-utilities");

module.exports = loop;

function loop(array, element, index, root) {
    let result;
    u.scope(loop.name, x => {
        u.merge(x,{array,element,index,root});

        u.assert(() => u.isString(array));
        u.assert(() => u.isString(element));
        u.assert(() => u.isString(index));
        u.assert(() => u.isDefined(root));

        result = {
            $type: 'loop',
            array,
            element,
            index,
            root,
        }
    });
    return result;
}
