
const u = require("wlj-utilities");
const { EOL } = require('os');
const fs = require('fs');
const executeCommand = require("wlj-utilities/library/executeCommand");

module.exports = createFlow;

function createFlow(remaining) {
    let result;
    u.scope(createFlow.name, x => {
        u.assert(() => u.isArray(remaining));
        u.assert(() => remaining.length === 1);
        u.assert(() => u.isString(remaining[0]));

        let name = remaining[0];
        let capitalized = name[0].toUpperCase() + name.slice(1);
        let definitionName = 'define' + capitalized;

        let output = executeCommand('node u functionCreate ' + definitionName);
        console.log(output);

        let getLibraryPath = './library/getLibrary.js';
        fs.appendFileSync(getLibraryPath, EOL);
        fs.appendFileSync(getLibraryPath, `result.push(require("./${definitionName}")());`);

        require('../test');
    });
    return result;
}
