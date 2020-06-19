
const u = require("wlj-utilities");
const { EOL } = require('os');

const compile = require("../../library/compile.js");

module.exports = compileAndTest;

function compileAndTest(library, test) {
    u.scope(__filename, x => {
        u.scope(compileAndTest.name, x => {
            u.merge(x, {library});
            u.assert(() => u.isArray(library));
            u.merge(x, ()=>library.length);

            let compiles = [];    
            u.loop(library, fn => {
                u.merge(x,{fn});
                let lines = compile(fn, library);
                let compiled = lines.join(EOL);
                compiles.push(compiled);
            });
            u.merge(x, ()=>compiles.length);

            let text = compiles.join(EOL);

            test(text);
        });
    });
}