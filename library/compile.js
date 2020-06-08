
const u = require("wlj-utilities");
const getStatements = require("./getStatements");
const getAvailableVariables = require('./getAvailableVariables');

module.exports = compile;

const tab = '  ';

function compile(flow, flows) {
    let result;
    u.scope(compile.name, x => {
        u.merge(x, { flow, flows });
        let previousName;
        u.loop(flows, f => {
            u.merge(x, { previousName });
            u.assert(() => u.isDefined(f));
            previousName = f.name;
        });
        delete x.previousName;

        u.assert(() => u.isDefined(flow));
        u.merge(x, () => flow.name);
        delete x.f;
        u.assert(() => flow.$type === 'defineFunction');
        u.assert(() => u.isArray(flows));
        u.merge(x, () => flows.map(f => f.name));
        delete x.flows;

        let indent = tab;

        result = [];

        result.push(`function ${flow.name}(inputs) {`);
        result.push(`${indent}// Initialize output`);
        result.push(`${indent}const outputs = {};`);
        result.push(`${indent}u.scope(${flow.name}.name, $context => {`);
        result.push(`${indent}u.merge($context, {inputs});`);

        result.push(`${indent}// Validate input properties`);
        u.loop(flow.inputs, i => {
            result.push(`${indent}compileAssertHasOwnProperty(inputs, "${i.name}");`);
        });
        result.push(`${indent}// Set input variables`);
        u.loop(flow.inputs, i => {
            result.push(`${indent}const ${i.name} = inputs["${i.name}"];`);
        });
        result.push(`${indent}// Validate input types`);
        u.loop(flow.inputs, i => {
            result.push(`${indent}compileAssertIsType(${i.name}, ${JSON.stringify(i.type)});`);
        });
        result.push(`${indent}// Initialize outputs`);
        u.loop(flow.outputs, o => {
            result.push(`${indent}let ${o.name} = null;`);
        });

        result.push(`${indent}// Root statement ${flow.name}`);
        processStatement(flow.statement, result, indent, flow, flows);

        result.push(`${indent}// Set output`);
        u.loop(flow.outputs, o => {
            result.push(`${indent}outputs["${o.name}"] = ${o.name};`);
        });
        result.push(`${indent}u.merge($context, {outputs});`);
        u.loop(flow.outputs, o => {
            result.push(`${indent}compileAssertIsType(${o.name}, ${JSON.stringify(o.type)});`);
        });

        result.push(`${indent}});`);
        result.push(`${indent}return outputs;`);
        result.push(`}`);
    });
    return result;
}

function processStatement(statement, lines, indent, flow, flows) {
    let result;
    u.scope(processStatement.name, x => {
        u.merge(x, { statement });
        //u.merge(x, { lines, indent, fns});

        u.assert(() => u.isDefined(statement));
        u.assertIsStringArray(lines);
        u.assert(() => u.isString(indent));
        u.assert(() => u.isArray(flows));

        let fnsNames = flows.map(f => f.name);
        u.merge(x, { fnsNames });

        let types = {
            evaluate: () => lines.push(`${indent}eval("${statement.expression}")`),
            execute: () => {
                u.merge(x, () => statement.inputs);
                u.merge(x, () => statement.outputs);
                let definition = u.arraySingle(flows, { name: statement.name });

                lines.push(`${indent}// Execute ${statement.name}`);
                lines.push(`${indent}(function () {`);
                lines.push(`${indent}${tab}const executeInputs = {};`);
                u.loop(definition.inputs, input => {
                    let inputName = input.name;
                    u.merge(x, { inputName });
                    u.assert(() => !fnsNames.includes(inputName));
                    let mappedInput = statement.inputs[inputName];
                    u.merge(x, { mappedInput });
                    u.assert(() => u.isString(mappedInput));
                    lines.push(`${indent}${tab}executeInputs["${input.name}"] = ${mappedInput};`);
                });
                lines.push(`${indent}${tab}const executeOutputs = ${statement.name}(executeInputs);`);
                let outputNames = definition.outputs.map(o => o.name);
                u.merge(x, { outputNames });
                u.assert(() => u.isSetEqual(outputNames, Object.keys(statement.outputs)));
                u.loop(definition.outputs, output => {
                    let outputName = output.name;
                    u.merge(x, { outputName });
                    u.assert(() => !fnsNames.includes(outputName));
                    let mappedOutput = statement.outputs[outputName];
                    u.merge(x, { mappedOutput });
                    u.assert(() => u.isString(mappedOutput));
                    lines.push(`${indent}${tab}${mappedOutput} = executeOutputs["${output.name}"];`);
                });
                lines.push(`${indent}})();`);
            },
            loop: () => {
                lines.push(`${indent}let ${statement.index} = 0;`);
                lines.push(`${indent}for (const ${statement.element} of ${statement.array}) {`);
                processStatement(statement.statement, lines, indent + tab, flow, flows);

                lines.push(`${indent + tab}${statement.index}++;`);
                lines.push(`${indent}}`)
            },
            set: () => {
                u.assert(() => u.isDefined(statement.right));
                u.assert(() => statement.right.$type === 'newInt');
                let right = statement.right.value;
                u.merge(x,() => getAvailableVariables(flow).map(v => v.name));
                u.merge(x,() => statement.left);
                u.assert(() => getAvailableVariables(flow).map(v => v.name).includes(statement.left));
                lines.push(`${indent}${statement.left} = ${right};`);
            },
            steps: () => {
                lines.push(`${indent}// Steps`);
                u.loop(statement.steps, step => {
                    u.merge(x, { step })
                    processStatement(step, lines, indent + tab, flow, flows);
                });
            },
        };

        let typeKeys = Object.keys(types);
        u.merge(x, { typeKeys });

        const statements = getStatements();
        u.merge(x, { statements });

        u.assert(() => u.isSetEqual(statements, typeKeys));

        u.merge(x, () => statement.$type);
        u.assert(() => statements.includes(statement.$type));

        types[statement.$type]();
    });
    return result;
}