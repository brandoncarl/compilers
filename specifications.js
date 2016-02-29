
module.exports = [{
  "name"    : "javascript",
  "ext"     : "js",
  "type"    : "js",
  "modules" : [],
  "syntax"  : ""
},
{
  "name"    : "css",
  "ext"     : "css",
  "type"    : "css",
  "modules" : [],
  "syntax"  : ""
},
{
  "name"    : "html",
  "ext"     : "html",
  "type"    : "html",
  "modules" : [],
  "syntax"  : ""
},
{
  "name"    : "html-minifier",
  "ext"     : "html",
  "type"    : "html",
  "modules" : ["html-minifier"],
  "syntax"  : "minify(str, options)",
  "options"  : {
    "removeComments": true,
    "removeCommentsFromCDATA": true,
    "removeCDATASectionsFromCDATA": true,
    "collapseWhitespace": true,
    "collapseBooleanAttributes": true,
    "removeAttributeQuotes": true,
    "removeRedundantAttributes": true,
    "useShortDoctype": true,
    "removeEmptyAttributes": true,
    "minifyJS": true,
    "minifyCSS": true
  }
},
{
  "name"    : "es2015",
  "ext"     : "js",
  "type"    : "js",
  "modules" : ["babel-core", "babel-preset-es2015"],
  "syntax"  : "transform(str, options)",
  "options" : { "presets" : ["es2015"] },
  "suffix"  : ".code"
},
{
  "name"    : "react",
  "ext"     : "jsx",
  "type"    : "js",
  "modules" : ["babel-core", "babel-preset-react"],
  "syntax"  : "transform(str, options)",
  "options"  : { "presets" : ["react"] },
  "suffix"  : ".code"
},
{
  "name"    : "typescript",
  "ext"     : "ts",
  "type"    : "js",
  "modules" : ["typescript"],
  "syntax"  : "transpile(str)"
},
{
  "name"    : "coffee-script",
  "ext"     : "coffee",
  "type"    : "js",
  "modules" : ["coffee-script"],
  "syntax"  : "compile(str)"
},
{
  "name"    : "stylus",
  "ext"     : "styl",
  "type"    : "css",
  "modules" : ["stylus"],
  "syntax"  : "render(str, context, next)"
},
{
  "name"    : "ejs",
  "ext"     : "ejs",
  "type"    : "html",
  "modules" : ["consolidate", "ejs"],
  "syntax"  : "ejs.render(str, context, next)"
},
{
  "name"    : "livescript",
  "ext"     : "ls",
  "type"    : "js",
  "modules" : ["livescript"],
  "syntax"  : "compile(str)"
},
{
  "name"    : "sweet.js",
  "ext"     : "js",
  "type"    : "js",
  "modules" : ["sweet.js"],
  "syntax"  : "compile(str)"
},
{
  "name"    : "handlebars",
  "ext"     : "hbs",
  "type"    : "html",
  "modules" : ["consolidate", "handlebars"],
  "syntax"  : "handlebars.render(str, context, next)"
},
{
  "name"    : "swig",
  "ext"     : "html",
  "type"    : "html",
  "modules" : ["consolidate", "swig"],
  "syntax"  : "swig.render(str, options, next)"
},
{
  "name"    : "mustache",
  "ext"     : "mustache",
  "type"    : "html",
  "modules" : ["consolidate", "mustache"],
  "syntax"  : "mustache.render(str, context, next)"
},
{
  "name"    : "dust",
  "ext"     : "dust",
  "type"    : "html",
  "modules" : ["consolidate", "dustjs-linkedin", "dust-helpers"],
  "syntax"  : "dust.render(str, context, next)"
},
{
  "name"    : "haml",
  "ext"     : "haml",
  "type"    : "html",
  "modules" : ["consolidate", "hamljs"],
  "syntax"  : "haml.render(str, context, next)"
},
{
  "name"    : "nunjucks",
  "ext"     : "html",
  "type"    : "html",
  "modules" : ["consolidate", "nunjucks"],
},
{
  "name"    : "swig",
  "ext"     : "html",
  "type"    : "html",
  "modules" : ["consolidate", "swig"],
  "syntax"  : "swig.render(str, options, next)"
  "syntax"  : "nunjucks.render(str, context, next)"
},
{
  "name"    : "hogan",
  "ext"     : "html",
  "type"    : "html",
  "modules" : ["consolidate", "hogan.js"],
  "syntax"  : "hogan.render(str, context, next)"
},
{
  "name"    : "jade",
  "ext"     : "jade",
  "type"    : "html",
  "modules" : ["consolidate", "jade"],
  "syntax"  : "jade.render(str, context, next)"
},
{
  "name"    : "sass",
  "ext"     : ["sass", "scss"],
  "type"    : "css",
  "modules" : ["node-sass"],
  "syntax"  : "renderSync({ \"data\" : str })"
},
{
  "name"    : "less",
  "ext"     : "less",
  "type"    : "css",
  "modules" : ["less"],
  "syntax"  : "render(str, options, next)"
},
{
  "name"    : "autoprefixer",
  "ext"     : "css",
  "type"    : "css",
  "modules" : ["postcss", "autoprefixer"],
  "syntax"  : "([$1]).process(str).css"
},
{
  "name"    : "lodash",
  "ext"     : "html",
  "type"    : "html",
  "modules" : ["consolidate", "lodash"],
  "syntax"  : "['lodash'].render(str, context, next)"
},
{
  "name"    : "underscore",
  "ext"     : "html",
  "type"    : "html",
  "modules" : ["consolidate", "underscore"],
  "syntax"  : "['underscore'].render(str, context, next)"
},
{
  "name"    : "uglify-js",
  "ext"     : "js",
  "type"    : "js",
  "modules" : ["uglify-js"],
  "syntax"  : "minify(str, { \"fromString\" : true}).code"
},
{
  "name"    : "clean-css",
  "ext"     : "css",
  "type"    : "css",
  "modules" : ["clean-css"],
  "syntax"  : "new $0().minify(str).styles"
}];
