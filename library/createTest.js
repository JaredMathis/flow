
const u = require("wlj-utilities");
const readlineSync = require('readline-sync');
const library = require('./getLibrary')();
const fs = require('fs');
const { EOL } = require('os');
const path = require('path');

module.exports = createTest;

function createTest(remaining) {
    let result;
    u.scope(createTest.name, x => {
        u.assert(() => u.isArray(remaining));
        u.assert(() => remaining.length === 1);
        u.assert(() => u.isString(remaining[0]));

        let name = remaining[0];

        let flow = u.arraySingle(library, {name});

        let test = {
            input: {},
            output: {},
        };
        test.name = name;

        let types = {};
        types['typeInt'] = userInput => {
            let parsed = parseInt(userInput, 10);
            return parsed;
        };

        console.log(`Here are the inputs for ${flow.name}:`, flow.inputs);
        u.loop(flow.inputs, input => {
            let getValue = types[input.type.$type];
            u.assert(() => u.isDefined(getValue));
            let userInput = readlineSync.question(`What value for input ${input.name}? `);
            let value = getValue(userInput);
            test.input[input.name] = value;
        });

        console.log(`Here are the outputs for ${flow.name}:`, flow.outputs);
        u.loop(flow.outputs, output => {
            let action = types[output.type.$type];
            u.assert(() => u.isDefined(action));
            let userInput = readlineSync.question(`What value for output ${output.name}? `);
            let value = action(userInput);
            test.output[output.name] = value;
        });

        let directory = './tests/compile';

        let testFile = u.getUniqueFileName(path.join(directory, `${flow.name}.json`));
        let json = JSON.stringify(test, null, 2);
        fs.writeFileSync(testFile, json);

        let testsFile = path.join(directory, 'getTests.js');
        fs.appendFileSync(testsFile, EOL);
        fs.appendFileSync(testsFile, `test(require("./${path.basename(testFile)}"));`);

        require('./../test');
    });
    return result;
}
