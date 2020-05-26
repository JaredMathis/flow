
const u = require("wlj-utilities");

module.exports = compile;

function compile(f) {
    let result;
    u.scope(compile.name, x => {
        u.merge(x,{f});

        result = [];

        result.push([`function ${f.name}(`]);
        u.loop(f.inputs, i => {
            result.push([`  ${i.name},`]);
        });
        result.push([`  ) {`]);
        result.push([`  const outputs = {};`])
        u.loop(f.outputs, o => {
            result.push([`  ${o.name} = null;`]);
        });

        let fRoot = f.root;
        u.merge(x, {fRoot});
        u.assert(() => fRoot.type === 'evaluate');
        result.push(`  eval("${fRoot.expression}")`);
        
        u.loop(f.outputs, o => {
            result.push([`  outputs["${o.name}"] = ${o.name};`]);
        });

        result.push([`  return outputs`]);
        result.push([`}`]);
    });
    return result;
}
