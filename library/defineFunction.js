
const u = require("wlj-utilities");

const assertIsFunction = require("./assertIsFunction");
const assertIsFunctionName = require("./assertIsFunctionName");

module.exports = defineFunction;

function defineFunction(name, inputs, outputs, root) {
    let result;
    u.scope(defineFunction.name, x => {
        // TODO: Ensure multiple functions with the same
        // name are not defined. 
        // Probably not in this function.

        u.merge(x,{name});
        u.merge(x,{inputs});
        u.merge(x,{outputs});
        u.merge(x,{root});
        
        assertIsFunctionName(name);
        u.assert(() => u.isArray(inputs));
        u.assert(() => u.isArray(outputs));
        u.assert(() => u.isDefined(root));

        let inputNames = inputs.map(i => i.name);
        u.merge(x, {inputNames});
        u.assert(() => !inputNames.includes(name));
        u.assert(() => !u.arrayContainsDuplicates(inputNames));

        let outputNames = outputs.map(i => i.name);
        u.assert(() => !outputNames.includes(name));
        u.merge(x, {outputNames});
        u.assert(() => !u.arrayContainsDuplicates(outputNames));

        result = {
            $type: 'defineFunction',
            name,
            inputs,
            outputs,
            root,
        };

        assertIsFunction(result);
    });
    return result;
}
