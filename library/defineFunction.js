
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
        let duplicates = u.arrayContainsDuplicates(inputNames);
        u.merge(x, {duplicates});
        u.assert(() => !duplicates);

        result = {
            name,
            inputs,
            outputs,
            root,
        };

        assertIsFunction(result);
    });
    return result;
}
