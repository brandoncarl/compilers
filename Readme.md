# preschool

Given a request for a preprocessor/transpiler/templating engine/postprocessor,
spits back a function of the form `function(err, compiled)`.

The [specifications](#specifications) are highly extensible. Initial specs
support wide range of functions (from Typescript to ES2015 to minification
and cleaning). Pull requests and tests welcome! See instructions on writing
a specification below.

## Installation

```
$ npm install preschool
```

## Examples

```js
var compileHandlebars = preschool("handlebars");

compileHandlebars("<div>Hello, {{ name }}!</div>", { name : "Mickey" }, function(err, compiled) {
  console.log(compiled);
  // <div>Hello, Mickey!</div>
});

// Don't "npm install" missing modules (defaults to installing)
var compileHandlebars = preschool("handlebars", { fetch : false });
// => Throws error if handlebars is missing

// "npm install" to different directory
var compileHandlebars = preschool("handlebars", { dir : process.cwd() });
```


## API

[preschool](#preschool) ⇒ <code>function</code>  
[.defaultEngineForExtension(ext)](#preschool.defaultEngineForExtension) ⇒ <code>String</code>  

<a name="preschool"></a>
## preschool ⇒ <code>function</code>
Loads a processor (templating, transpiler, minification), and standardizes
callback to be fn(err, compiled). Defaults to `npm install` packages if they
are missing. To disable, set `options.fetch` to `false`;

Most packages are referenced by their npm name, common exceptions include:
javascript, html, css, es2015, and react.

Note that the callback is node style (err, compiled).

**Returns**: <code>function</code> - Processor of format `fn(str, options, next)`  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of module (npm install name). |
| options | <code>Object</code> | Options include {fetch} and {dir} (install directory). |

**Example**  
```js
preschool("typescript")
  // => fn(str, options, next) for typescript
```

<a name="preschool.defaultEngineForExtension"></a>
### preschool.defaultEngineForExtension(ext) ⇒ <code>String</code>
Returns the default engine for an extension. Leading "." is removed.

**Returns**: <code>String</code> - Name of the default engine.  

| Param | Type | Description |
| --- | --- | --- |
| ext | <code>String</code> | The file extension. |

**Example**  
```js
preschool.defaultEngineForExtension("ts");
  // => "typescript"
```


## Specifications

Specifications make use of JavaScript's `eval`. While using `eval` is typically
considered to be bad form, when calling another function the performance does
not appear suffer in V8. See http://jsperf.com/eval-function-call.

A specification consists of the following:  

| Param | Type | Description |
| --- | --- | --- |
| name | String | Name of engine (by convention we use npm package name) |
| ext | String | Typical file extension (e.g. handlebars uses hbs) |
| type | String | Type of output file (html, css, js) |
| modules | Array | Array of required modules |
| syntax | String | The function to be evaluated |

### Example specification
```js
{
  "name"    : "handlebars",
  "ext"     : "hbs",
  "type"    : "html",
  "modules" : ["consolidate", "handlebars"],
  "syntax"  : "handlebars.render(str, options, next)"
}
```

### Looking up a specification by extension
Specifications is processed as an array. The first specification with `ext` is
assumed to be the default for extension `ext`. This is why `css`, `html` and `js`
are located at the top of the specification.

### Writing a specification
The syntax processor does the following:
1. Prepends `$0` to the string if string doesn't contain $0.
2. Replaces all `$x` with `modules[x]`. This allows incorporate of modules array.
3. Creates function that evaluates command. Note that `str`, `options` and `next`
   have special meanings.

Using Handlebars as an example:
```js
// Input
handlebars.render(str, options, next)

// Interim
modules[0].handlebars.render(str, options, next)

// Equivalent function
function(str, options, next) { consolidate.handlebars.render(str, options, next); }
```

## License
MIT
