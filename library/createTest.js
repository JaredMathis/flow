
const u = require("wlj-utilities");
const readlineSync = require('readline-sync');
const library = require('./getLibrary')();
const fs = require('fs');
const { EOL } = require('os');
const path = require('path');

module.exports = createTest;

function createTest() {
    let result;
    u.scope(createTest.name, x => {
        let valid;
        
        let name;
        valid = false;
        while (!valid) {
            const names = library.map(f => f.name);
            names.sort();
            name = readlineSync.question('What flow do you want to test? ');
            if (names.includes(name)) {
                valid = true;
            } else {
                console.log('Invalid flow name. Valid flow names:');
                u.loop(names, n => console.log(n));
            }
        }

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

        console.log('Here are the inputs for that flow:', flow.inputs);
        u.loop(flow.inputs, input => {
            let getValue = types[input.type.$type];
            u.assert(() => u.isDefined(getValue));
            let userInput = readlineSync.question(`What value for input ${input.name}? `);
            let value = getValue(userInput);
            test.input[input.name] = value;
        });

        console.log('Here are the outputs for that flow:', flow.outputs);
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

        let testsFile = path.join(directory, 'compile.js');
        fs.appendFileSync(testsFile, EOL);
        fs.appendFileSync(testsFile, `test("./${path.basename(testFile)}");`);

        require('./../test');
    });
    return result;
}
