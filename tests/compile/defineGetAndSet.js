
const u = require("wlj-utilities");
const { EOL } = require('os');

const compile = require("../../library/compile.js");
const compileAssertIsType = require("../../library/compileAssertIsType.js");
const compileAssertHasOwnProperty = require("../../library/compileAssertHasOwnProperty.js");
const compileGetInMemory = require("../../library/compileGetInMemory.js");
const compileSetInMemory = require("../../library/compileSetInMemory.js");
const compileAndTest = require('./compileAndTest');

const library = require('../../library/getLibrary')();

u.scope(__filename, x => {
    compileAndTest(library, text => {
        let log = false;
        eval(text);

        if (log) console.log(text);

        let location = 'myLocation'.split('');
        let value = 'myValue'.split('');
        eval(`set({location,value})`);
        let actual;
        eval(`actual = get({location})`);
    });
});
