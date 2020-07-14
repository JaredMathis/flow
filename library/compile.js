
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
        let indent2 = indent + tab;
        result.push(`${indent2}u.merge($context, {inputs});`);

        result.push(`${indent2}// Validate input properties`);
        u.loop(flow.inputs, i => {
            result.push(`${indent2}compileAssertHasOwnProperty(inputs, "${i.name}");`);
        });
        result.push(`${indent2}// Set input variables`);
        u.loop(flow.inputs, i => {
            result.push(`${indent2}const ${i.name} = inputs["${i.name}"];`);
        });
        result.push(`${indent2}// Validate input types`);
        u.loop(flow.inputs, i => {
            result.push(`${indent2}compileAssertIsType(${i.name}, ${JSON.stringify(i.type)});`);
        });
        result.push(`${indent2}// Initialize outputs`);
        u.loop(flow.outputs, o => {
            result.push(`${indent2}let ${o.name} = null;`);
        });
        result.push(`${indent2}// Initialize variables`);
        u.assertIsArray(() => flow.variables);
        u.loop(flow.variables, v => {
            result.push(`${indent2}let ${v.name} = null;`);
        });

        result.push(`${indent2}// Root statement ${flow.name}`);
        processStatement(flow.statement, result, indent2, flow, flows);

        result.push(`${indent2}// Set output`);
        u.loop(flow.outputs, o => {
            result.push(`${indent2}outputs["${o.name}"] = ${o.name};`);
        });
        result.push(`${indent2}u.merge($context, {outputs});`);
        u.loop(flow.outputs, o => {
            result.push(`${indent2}compileAssertIsType(${o.name}, ${JSON.stringify(o.type)});`);
        });

        // Close scope
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
            ifElse: () => {
                lines.push(`${indent}if (${statement.condition}) {`);
                processStatement(statement.ifStatement, lines, indent + tab, flow, flows);
                
                lines.push(`${indent}} else {`);
                processStatement(statement.elseStatement, lines, indent + tab, flow, flows);
                
                lines.push(`${indent}}`);
            },
            loop: () => {
                lines.push(`${indent}${statement.index} = 0;`);
                lines.push(`${indent}while (${statement.index} < ${statement.array}.length) {`);
                lines.push(`${indent}${tab}${statement.element} = ${statement.array}[${statement.index}];`);
                processStatement(statement.statement, lines, indent + tab, flow, flows);

                lines.push(`${indent + tab}${statement.index}++;`);
                lines.push(`${indent}}`)
            },
            set: () => {
                u.assert(() => u.isDefined(statement.right));
                u.merge(x,() => getAvailableVariables(flow).map(v => v.name));
                u.merge(x,() => statement.left);
                u.assert(() => getAvailableVariables(flow).map(v => v.name).includes(statement.left));

                let right;
                if (statement.right.$type === 'newInt') {
                    right = statement.right.value;
                } else if (statement.right.$type === 'newText') {
                    right = statement.right.value;
                } else {
                    u.assert(false);
                }

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