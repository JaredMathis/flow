
const u = require("wlj-utilities");
const { EOL } = require('os');

const compile = require("../../library/compile.js");
const defineAdd = require("../../library/defineAdd.js");

u.scope(__filename, x => {
    let log = false;
    let syntax = defineAdd();
    let lines = compile(syntax);
    let text = lines.join(EOL);
    if (log) console.log({text});
    eval(text);
    u.assert(() => add(1, 2)['sum'] === 3);
});
