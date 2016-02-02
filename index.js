
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
    byExt   = {},
    cache   = {},
    root;


// Ensure our configurations are properly formatted
specs.forEach(parseSpecification);

function parseSpecification(spec) {

  // Create dictionary by name
  byName[spec.name] = spec;

  // Insert modules if missing
  spec["modules"] = spec["modules"] || [];

  // Expand extensions
  if (!Array.isArray(spec.ext)) spec.ext = [spec.ext];

  // Create dictionary by extension
  spec.ext.forEach(function(ext) {
    if (!byExt[ext]) byExt[ext] = spec.name;
  });

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


root = module.exports = function(name, config) {

  // Return cache if available
  if (cache[name]) return cache[name];

  var engine   = byName[name],
      config   = config || {},
      modules  = engine.modules.map(function(x) { return desires(x, { dir : config.dir }); }),
      syntax   = engine.syntax,
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


root.defaultEngineForExtension = function(ext) {
  return byExt[ext];
};

