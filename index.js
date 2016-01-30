
/*

  Preschool

  Given a request for a preprocessor, spits back a function of the form function(err, compiled).
  Function are cached for performance.

  While using "eval" is typically considered to be bad form, when calling another function the
  performance does not appear suffer in V8. See http://jsperf.com/eval-function-call.

*/

var desires = require("desires"),
    specs   = require("./specifications"),
    byName  = {},
    cache   = {},
    root;


// Ensure our configurations are properly formatted
specs.forEach(preprocessConfig);

function preprocessConfig(config) {

  // Create dictionary by name
  byName[config.name] = config;

  // Insert modules if missing
  config["modules"] = config["modules"] || [];

  // Expand extensions
  if (!Array.isArray(config.ext)) config.ext = [config.ext];

}


// Ensure arguments are correct
function createFunction(fn) {
  return function(str, options, next) {
    if ("function" === typeof options) {
      next = options;
      options = {};
    }
    fn(str, options, next);
  }
}


root = module.exports = function(name) {

  // Return cache if available
  if (cache[name]) return cache[name];

  var config  = byName[name],
      modules = config.modules.map(desires),
      syntax  = config.syntax,
      fn;

  // If blank, return
  if ("" === syntax)
    return cache[name] = createFunction(function(str, options, next) { return next(null, str); });

  // Add core module to beginning (with dot property unless brackets)
  if (-1 === syntax.indexOf("$0"))
    syntax = "$0" + (("(" === syntax[0] || "[" === syntax[0]) ? "" : ".") + syntax

  // Reinsert modules
  modules.forEach(function(mod, i) {
    syntax = syntax.replace(new RegExp("\\$" + i, "g"), "modules[" + i + "]");
  });

  // If function is already asynchronous
  if (syntax.indexOf("next)") > -1)
    fn = createFunction(function(str, options, next) {
      try { eval(syntax); } catch (err) { next(err); };
    });

  else
    fn = createFunction(function(str, options, next) {
      try { next(null, eval(syntax)); } catch (err) { next(err); }
    });

  return fn;

};

