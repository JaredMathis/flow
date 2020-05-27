
const u = require("wlj-utilities");
const getRoots = require("./getRoots");

module.exports = compile;

const tab = '  ';

function compile(f, fns) {
    let result;
    u.scope(compile.name, x => {
        u.merge(x,{f,fns});

        u.assert(() => u.isDefined(f));
        u.assert(() => f.$type === 'defineFunction');
        u.assert(() => u.isArray(fns));

        let indent = tab;

        result = [];

        result.push(`function ${f.name}(inputs) {`);
        result.push(`${indent}// Initialize output`);
        result.push(`${indent}const outputs = {};`);
        result.push(`${indent}u.scope(${f.name}.name, $context => {`);
        result.push(`${indent}u.merge($context, {inputs});`);
        result.push(`${indent}u.merge($context, {outputs});`);

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
            result.push(`${indent}${o.name} = null;`);
        });

        result.push(`${indent}// Root`);
        processRoot(f.root, result, indent, fns);
        
        result.push(`${indent}// Set output`);
        u.loop(f.outputs, o => {
            result.push(`${indent}compileAssertIsType(${o.name}, ${JSON.stringify(o.type)});`);
            result.push(`${indent}outputs["${o.name}"] = ${o.name};`);
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
        u.merge(x, {root, lines, indent})
        u.assert(() => u.isDefined(root));
        u.assertIsStringArray(lines);
        u.assert(() => u.isString(indent));
        u.assert(() => u.isArray(fns));

        let types = {
            evaluate: () => lines.push(`${indent}eval("${root.expression}")`),
            execute: () => {
                let definition = u.arraySingle(fns, { name: root.name });

                lines.push(`${indent}// Execute ${root.name}`);
                lines.push(`${indent}(function () {`);
                lines.push(`${indent}${tab}const executeInputs = {};`);
                u.loop(definition.inputs, input => {
                    let mapped = root.inputs[input.name];
                    u.merge(x, {mapped});
                    u.assert(() => u.isString(mapped));
                    lines.push(`${indent}${tab}executeInputs["${input.name}"] = ${mapped};`);
                });
                lines.push(`${indent}${tab}const executeOutputs = ${root.name}(executeInputs);`);
                u.loop(definition.outputs, output => {
                    let mapped = root.outputs[output.name];
                    u.merge(x, {mapped});
                    u.assert(() => u.isString(mapped));
                    lines.push(`${indent}${tab}${mapped} = executeOutputs["${output.name}"];`);
                });
                lines.push(`${indent}})();`);
            },
            loop: () => {
                lines.push(`${indent}let ${root.index} = 0;`);
                lines.push(`${indent}for (const ${root.element} of ${root.array}) {`);
                processRoot(root.root, lines, indent + tab, fns);
                
                lines.push(`${indent+tab}${root.index}++;`);
                lines.push(`${indent}}`)
            },
            set: () => {
                u.assert(() => u.isDefined(root.right));
                u.assert(() => root.right.$type === 'newInt');
                let right = root.right.value;
                lines.push(`${indent}${root.left} = ${right};`);
            },
            steps: () => {
                u.loop(root.steps, step => {
                    u.merge(x, {step})
                    processRoot(step, lines, indent + tab, fns);
                });
            },
        };

        let typeKeys = Object.keys(types);
        u.merge(x, {typeKeys});

        const roots = getRoots();
        u.merge(x, {roots});
        
        u.assert(() => u.isSetEqual(roots, typeKeys));

        let rootType = root.$type;
        u.merge(x, {rootType});

        u.assert(() => roots.includes(rootType));

        types[rootType]();
    });
    return result;
}