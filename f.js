const commandLine = require('wlj-utilities').commandLine;
const createTest = require('./library/createTest');
const createFlow = require('./library/createFlow');
const u = require('wlj-utilities');

u.scope(__filename, x => {
    commandLine({
        createTest,
        createFlow,
    });
})