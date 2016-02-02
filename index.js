/**

  preschool.js
  Copyright 2016 Brandon Carl
  MIT Licensed

*/


//
//  Dependencies
//

var desires = require("desires"),
    specs   = require("./specifications"),
    byName  = {},
    byExt   = {},
    cache   = {},
    root;


/**

  Loads a processor (templating, transpiler, minification), and standardizes
  callback to be fn(err, compiled). Defaults to "npm install" packages if they
  are missing. To disable, set options.fetch to `false`;

  Most packages are referenced by their npm name, common exceptions include:
  javascript, html, css, es2015, and react.

  Note that the callback is node-style (err, compiled).

  @param {String} name Name of module (npm install name).
  @param {Object} options Options include {fetch} and {dir} (install directory).
  @returns {Function} Processor of format fn(str, options, next)

  @example
  preschool("typescript")
  // => fn(str, options, next) for typescript

**/

root = module.exports = function(name, options) {

  // Return cache if available
  if (cache[name]) return cache[name];

  var engine = byName[name],
      syntax = engine.syntax,
      modules;

  options = Object.assign({ fetch : true }, options);

  // Optionally fetch modules using `npm install`
  if (options.fetch)
    modules = engine.modules.map(function(x) { return desires(x, { dir : options.dir }); });
  else
    modules = engine.modules.map(function(x) { return require(x); });

  // If blank, return
  if ("" === syntax) {
    cache[name] = createFunction(function(str, options, next) { return next(null, str); });
    return cache[name];
  }

  // Add core module to beginning (with dot property unless brackets)
  if (-1 === syntax.indexOf("$0"))
    syntax = "$0" + (("(" === syntax[0] || "[" === syntax[0]) ? "" : ".") + syntax;

  // Reinsert modules
  modules.forEach(function(mod, i) {
    syntax = syntax.replace(new RegExp("\\$" + i, "g"), "modules[" + i + "]");
  });

  // While using "eval" is typically considered to be bad form, when calling another function the
  // performance does not appear suffer in V8. See http://jsperf.com/eval-function-call.
  if (syntax.indexOf("next)") > -1)

    // If already async...
    cache[name] = createFunction(function(str, options, next) {
      try { eval(syntax); } catch (err) { next(err); }
    });

  else

    cache[name] = createFunction(function(str, options, next) {
      try { next(null, eval(syntax)); } catch (err) { next(err); }
    });

  return cache[name];

};



/**

  Returns the default engine for an extension. Leading "." is removed.

  @param {String} ext The file extension.
  @returns {String} Name of the default engine.

  @example
  preschool.defaultEngineForExtension("ts");
  // => "typescript"

**/

root.defaultEngineForExtension = function(ext) {
  return byExt[ext.replace(/^\./, "")];
};




//
//  Helpers
//

// Wraps function to ensure proper polymorphism. We could use a library
// like "reorg", but we code manually given simplicity and desire for performance.
function createFunction(fn) {
  return function(str, options, next) {
    if ("function" === typeof options) {
      next = options;
      options = {};
    }
    fn(str, options, next);
  };
}


// Ensure our configurations are properly formatted
specs.forEach(parseSpecification);

// Creates byName and byExt dictionaries, and ensures that specification is
// in the correct format.
function parseSpecification(spec) {

  // Create dictionary by name
  byName[spec.name] = spec;

  // Insert modules if missing
  spec.modules = spec.modules || [];

  // Expand extensions
  if (!Array.isArray(spec.ext)) spec.ext = [spec.ext];

  // Create dictionary by extension
  spec.ext.forEach(function(ext) {
    if (!byExt[ext]) byExt[ext] = spec.name;
  });

}
