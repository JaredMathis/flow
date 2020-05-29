
const u = require("wlj-utilities");
const { execSync } = require('child_process');
const { EOL } = require('os');
const fs = require('fs');

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

        execSync('node u fn ' + definitionName);

        let getLibraryPath = './library/getLibrary.js';
        fs.appendFileSync(getLibraryPath, EOL);
        fs.appendFileSync(getLibraryPath, `result.push(require("./${definitionName}")());`);

        require('../test');
    });
    return result;
}
