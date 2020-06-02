
const u = require("wlj-utilities");
const getRoots = require("./getRoots");

module.exports = compile;

const tab = '  ';

function compile(f, fns) {
    let result;
    u.scope(compile.name, x => {
        u.merge(x, { f, fns });
        let previousName;
        u.loop(fns, fn => {
            u.merge(x, { previousName });
            u.assert(() => u.isDefined(fn));
            previousName = fn.name;
        });
        delete x.previousName;

        u.assert(() => u.isDefined(f));
        u.merge(x, () => f.name);
        delete x.f;
        u.assert(() => f.$type === 'defineFunction');
        u.assert(() => u.isArray(fns));
        u.merge(x, () => fns.map(f => f.name));
        delete x.fns;

        let indent = tab;

        result = [];

        result.push(`function ${f.name}(inputs) {`);
        result.push(`${indent}// Initialize output`);
        result.push(`${indent}const outputs = {};`);
        result.push(`${indent}u.scope(${f.name}.name, $context => {`);
        result.push(`${indent}u.merge($context, {inputs});`);

        result.push(`${indent}// Validate input properties`);
        u.loop(f.inputs, i => {
            result.push(`${indent}compileAssertHasOwnProperty(inputs, "${i.name}");`);
        });
        result.push(`${indent}// Set input variables`);
        u.loop(f.inputs, i => {
            result.push(`${indent}const ${i.name} = inputs["${i.name}"];`);
        });
        result.push(`${indent}// Validate input types`);
        u.loop(f.inputs, i => {
            result.push(`${indent}compileAssertIsType(${i.name}, ${JSON.stringify(i.type)});`);
        });
        result.push(`${indent}// Initialize outputs`);
        u.loop(f.outputs, o => {
            result.push(`${indent}let ${o.name} = null;`);
        });

        result.push(`${indent}// Root ${f.name}`);
        processRoot(f.root, result, indent, fns);

        result.push(`${indent}// Set output`);
        u.loop(f.outputs, o => {
            result.push(`${indent}outputs["${o.name}"] = ${o.name};`);
        });
        result.push(`${indent}u.merge($context, {outputs});`);
        u.loop(f.outputs, o => {
            result.push(`${indent}compileAssertIsType(${o.name}, ${JSON.stringify(o.type)});`);
        });

        result.push(`${indent}});`);
        result.push(`${indent}return outputs;`);
        result.push(`}`);
    });
    return result;
}

function processRoot(root, lines, indent, fns) {
    let result;
    u.scope(processRoot.name, x => {
        u.merge(x, { root });
        //u.merge(x, { lines, indent, fns});

        u.assert(() => u.isDefined(root));
        u.assertIsStringArray(lines);
        u.assert(() => u.isString(indent));
        u.assert(() => u.isArray(fns));

        let fnsNames = fns.map(f => f.name);
        u.merge(x, { fnsNames });

        let types = {
            block: () => {
                lines.push(`${indent}// Block`);
                lines.push(`${indent}(function () {`);
                u.loop(root.variables, v => {
                    u.assert(() => u.isString(v.name));
                    u.assert(() => !fnsNames.includes(v.name));

                    // Variables can be assigned to; needs to be let not const
                    lines.push(`${indent}${tab}let ${v.name} = null;`);
                });
                processRoot(root.root, lines, indent + tab, fns);
                lines.push(`${indent}})();`);
            },
            evaluate: () => lines.push(`${indent}eval("${root.expression}")`),
            execute: () => {
                u.merge(x, () => root.inputs);
                u.merge(x, () => root.outputs);
                let definition = u.arraySingle(fns, { name: root.name });

                lines.push(`${indent}// Execute ${root.name}`);
                lines.push(`${indent}(function () {`);
                lines.push(`${indent}${tab}const executeInputs = {};`);
                u.loop(definition.inputs, input => {
                    let inputName = input.name;
                    u.merge(x, { inputName });
                    u.assert(() => !fnsNames.includes(inputName));
                    let mappedInput = root.inputs[inputName];
                    u.merge(x, { mappedInput });
                    u.assert(() => u.isString(mappedInput));
                    lines.push(`${indent}${tab}executeInputs["${input.name}"] = ${mappedInput};`);
                });
                lines.push(`${indent}${tab}const executeOutputs = ${root.name}(executeInputs);`);
                let outputNames = definition.outputs.map(o => o.name);
                u.merge(x, { outputNames });
                u.assert(() => u.isSetEqual(outputNames, Object.keys(root.outputs)));
                u.loop(definition.outputs, output => {
                    let outputName = output.name;
                    u.merge(x, { outputName });
                    u.assert(() => !fnsNames.includes(outputName));
                    let mappedOutput = root.outputs[outputName];
                    u.merge(x, { mappedOutput });
                    u.assert(() => u.isString(mappedOutput));
                    lines.push(`${indent}${tab}${mappedOutput} = executeOutputs["${output.name}"];`);
                });
                lines.push(`${indent}})();`);
            },
            loop: () => {
                lines.push(`${indent}let ${root.index} = 0;`);
                lines.push(`${indent}for (const ${root.element} of ${root.array}) {`);
                processRoot(root.root, lines, indent + tab, fns);

                lines.push(`${indent + tab}${root.index}++;`);
                lines.push(`${indent}}`)
            },
            set: () => {
                u.assert(() => u.isDefined(root.right));
                u.assert(() => root.right.$type === 'newInt');
                let right = root.right.value;
                lines.push(`${indent}${root.left} = ${right};`);
            },
            steps: () => {
                lines.push(`${indent}// Steps`);
                u.loop(root.steps, step => {
                    u.merge(x, { step })
                    processRoot(step, lines, indent + tab, fns);
                });
            },
        };

        let typeKeys = Object.keys(types);
        u.merge(x, { typeKeys });

        const roots = getRoots();
        u.merge(x, { roots });

        u.assert(() => u.isSetEqual(roots, typeKeys));

        u.merge(x, () => root.$type);
        u.assert(() => roots.includes(root.$type));

        types[root.$type]();
    });
    return result;
}