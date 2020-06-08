
const u = require("wlj-utilities");

const defineFunction = require("../../library/defineFunction.js");
const evaluate = require("../../library/evaluate.js");
const variable = require("../../library/variable.js");
const typeInt = require("../../library/typeInt.js");

u.scope(__filename, x => {
    // TODO

    // Input cannot contain duplicate names
    u.assertThrows(() => defineFunction('functionName', [
        variable('a', typeInt()),
        variable('a', typeInt()),
    ], [

    ], evaluate(";")));

    // Output cannot contain duplicate names
    u.assertThrows(() => defineFunction('functionName', [

    ], [
        variable('a', typeInt()),
        variable('a', typeInt()),
    ], evaluate(";")));

    // Input cannot contain function name
    u.assertThrows(() => defineFunction('functionName', [
        variable('functionName', typeInt()),
    ], [

    ], evaluate(";")));

    // Missing argument
    u.assertThrows(() => result = defineFunction(
        'average', 
        [
            variable('array', typeList(typeInt())),
        ],
        [
            variable('result', typeInt()),
        ],
        steps([
            execute('sum', 
                {'array':'array'},
                {'result':'s'}
            ),
            execute('count', 
                {'array':'array'},
                {'result':'c'}
            ),
            execute('divide', 
                {'x':'s','y':'c'},
                {'result':'result'}
            ),
        ]),
    ));
});
