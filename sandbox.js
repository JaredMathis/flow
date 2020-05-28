const u = require('wlj-utilities');

const compileAssertIsType = require("./library/compileAssertIsType.js");
const compileAssertHasOwnProperty = require("./library/compileAssertHasOwnProperty.js");

let expressions = [
    'add({x:4,y:5})',
    'count({array:[1,2,3]})',
];
expressions.forEach(e => console.log(eval(e)));

console.log(sum({array:[1,2,3]}));

function add(inputs) {
    // Initialize output
    const outputs = {};
    u.scope(add.name, $context => {
    u.merge($context, {inputs});
    u.merge($context, {outputs});
    // Validate input properties
    compileAssertHasOwnProperty(inputs, "x");
    compileAssertHasOwnProperty(inputs, "y");
    // Set input variables
    const x = inputs["x"];
    const y = inputs["y"];
    // Validate input types
    compileAssertIsType(x, {"$type":"typeInt"});
    compileAssertIsType(y, {"$type":"typeInt"});
    // Initialize outputs
    sum = null;
    // Root add
    eval("sum=x+y")
    // Set output
    compileAssertIsType(sum, {"$type":"typeInt"});
    outputs["sum"] = sum;
    });
    return outputs;
  }
  
  function sum(inputs) {
    // Initialize output
    const outputs = {};
    u.scope(sum.name, $context => {
    u.merge($context, {inputs});
    u.merge($context, {outputs});
    // Validate input properties
    compileAssertHasOwnProperty(inputs, "array");
    // Set input variables
    const array = inputs["array"];
    // Validate input types
    compileAssertIsType(array, {"$type":"typeList","nested":{"$type":"typeInt"}});
    // Initialize outputs
    result = null;
    // Root sum
    // Steps
      result = 0;
      let index = 0;
      for (const a of array) {
        // Execute add
        (function () {
          const executeInputs = {};
          executeInputs["x"] = result;
          executeInputs["y"] = a;
          const executeOutputs = add(executeInputs);
          result = executeOutputs["sum"];
        })();
        index++;
      }
    // Set output
    compileAssertIsType(result, {"$type":"typeInt"});
    outputs["result"] = result;
    });
    return outputs;
  }
  
  function count(inputs) {
    // Initialize output
    const outputs = {};
    u.scope(count.name, $context => {
    u.merge($context, {inputs});
    u.merge($context, {outputs});
    // Validate input properties
    compileAssertHasOwnProperty(inputs, "array");
    // Set input variables
    const array = inputs["array"];
    // Validate input types
    compileAssertIsType(array, {"$type":"typeList","nested":{"$type":"typeInt"}});
    // Initialize outputs
    result = null;
    // Root count
    // Steps
      result = 0;
      one = 1;
      let index = 0;
      for (const a of array) {
        // Execute add
        (function () {
          const executeInputs = {};
          executeInputs["x"] = result;
          executeInputs["y"] = one;
          const executeOutputs = add(executeInputs);
          result = executeOutputs["sum"];
        })();
        index++;
      }
    // Set output
    compileAssertIsType(result, {"$type":"typeInt"});
    outputs["result"] = result;
    });
    return outputs;
  }
  
  function average(inputs) {
    // Initialize output
    const outputs = {};
    u.scope(average.name, $context => {
    u.merge($context, {inputs});
    u.merge($context, {outputs});
    // Validate input properties
    compileAssertHasOwnProperty(inputs, "array");
    // Set input variables
    const array = inputs["array"];
    // Validate input types
    compileAssertIsType(array, {"$type":"typeList","nested":{"$type":"typeInt"}});
    // Initialize outputs
    result = null;
    // Root average
    // Block
    (function () {
      let s = null;
      let c = null;
      // Steps
        // Execute sum
        (function () {
          const executeInputs = {};
          executeInputs["array"] = array;
          const executeOutputs = sum(executeInputs);
          s = executeOutputs["result"];
        })();
        // Execute count
        (function () {
          const executeInputs = {};
          executeInputs["array"] = array;
          const executeOutputs = count(executeInputs);
          c = executeOutputs["result"];
        })();
    })();
    // Set output
    compileAssertIsType(result, {"$type":"typeInt"});
    outputs["result"] = result;
    });
    return outputs;
  }