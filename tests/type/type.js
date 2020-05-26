
const u = require("wlj-utilities");

const type = require("../../library/type.js");

u.scope(__filename, x => {
    let actual;
    let expected;
    
    actual = type('int', ['int']);
    u.merge(x,{actual});
    
    expected = 'int';
    u.merge(x,{expected});

    u.assert(() => actual === expected);
});
