
const u = require("wlj-utilities");

const assertIsFlow = require("./assertIsFlow");
const assertIsFunctionName = require("./assertIsFlowName");

module.exports = defineFunction;

function defineFunction(name, inputs, outputs, variables, statement) {
    let result;
    let args = arguments;
    u.scope(defineFunction.name, x => {
        // TODO: Ensure multiple functions with the same
        // name are not defined. 
        // Probably not in this function.

        u.merge(x,{name});
        u.merge(x,{inputs});
        u.merge(x,{outputs});
        u.merge(x,{statement});

        u.assert(() => args.length === 5);
        
        assertIsFunctionName(name);
        u.assert(() => u.isArray(inputs));
        u.assert(() => u.isArray(outputs));
        u.assert(() => u.isArray(variables));
        u.assert(() => u.isDefined(statement));

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
            variables,
            statement,
        };

        assertIsFlow(result);
    });
    return result;
}
