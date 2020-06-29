module.exports = {};
module.exports.getTypesPath = require("./library/getTypesPath.js");
module.exports.add = require("./library/defineAdd.js");
module.exports.defineFunction = require("./library/defineFunction.js");
module.exports.variable = require("./library/variable.js");
module.exports.assertIsValidType = require("./library/assertIsValidType.js");
module.exports.type = require("./library/type.js");
module.exports.evaluate = require("./library/evaluate.js");
module.exports.getTypes = require("./library/getTypes.js");
module.exports.compile = require("./library/compile.js");
module.exports.assertIsFlow = require("./library/assertIsFlow.js");
module.exports.assertIsFlowName = require("./library/assertIsFlowName.js");
module.exports.compileAssertIsType = require("./library/compileAssertIsType.js");
module.exports.package = require("./library/package.js");
module.exports.defineSum = require("./library/defineSum.js");
module.exports.typeInt = require("./library/typeInt.js");
module.exports.typeList = require("./library/typeList.js");
module.exports.steps = require("./library/steps.js");
module.exports.set = require("./library/set.js");
module.exports.newInt = require("./library/newInt.js");
module.exports.loop = require("./library/loop.js");
module.exports.execute = require("./library/execute.js");
module.exports.getStatements = require("./library/getStatements.js");
module.exports.compileAssertHasOwnProperty = require("./library/compileAssertHasOwnProperty.js");
module.exports.defineCount = require("./library/defineCount.js");
module.exports.defineAverage = require("./library/defineAverage.js");
module.exports.getLibrary = require("./library/getLibrary.js");
module.exports.defineDivide = require("./library/defineDivide.js");
module.exports.ifElse = require("./library/ifElse.js");
// This is not supported by browserify because of the readline-sync
// module.exports.createTest = require("./library/createTest.js");
module.exports.createFlow = require("./library/createFlow.js");
module.exports.defineMultiply = require("./library/defineMultiply.js");
module.exports.defineSubtract = require("./library/defineSubtract.js");
module.exports.defineMod = require("./library/defineMod.js");
module.exports.defineSet = require("./library/defineSet.js");
module.exports.defineGet = require("./library/defineGet.js");
module.exports.typeText = require("./library/typeText.js");
module.exports.typeChar = require("./library/typeChar.js");
module.exports.compileGetInMemory = require("./library/compileGetInMemory.js");
module.exports.compileSetInMemory = require("./library/compileSetInMemory.js");
module.exports.compileGetInMemoryStorage = require("./library/compileGetInMemoryStorage.js");
module.exports.getAvailableVariables = require("./library/getAvailableVariables.js");
module.exports.typeBool = require("./library/typeBool.js");
module.exports.defineEvenOdd = require("./library/defineEvenOdd.js");