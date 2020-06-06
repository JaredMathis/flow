
const u = require("wlj-utilities");

module.exports = forEachStatement;

function forEachStatement(statement, lambda) {
    let result;
    u.scope(forEachStatement.name, x => {
        let statements = {
            "block": () => {
                
            },
            "evaluate": () => {
                
            },
            "execute": () => {
                
            },
            "loop": () => {
                
            },
            "set": () => {
                
            },
            "steps": () => {
                statement                
            }
        };

        u.merge(x, () => getStatements());
        u.assert(() => u.arraySequenceEquals(getStatements(), Object.keys(statements)));
    });
    return result;
}
