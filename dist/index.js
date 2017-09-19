'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testing = exports.Styles = exports.setOptions = exports.withOptions = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

var _addPxToStyle = require('add-px-to-style');

var _addPxToStyle2 = _interopRequireDefault(_addPxToStyle);

var _hyphenateStyleName = require('hyphenate-style-name');

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var specialCharacters = "@: "; //['@',':'].join("");
var specialInnerCharacters = " >+~"; //['@',':'].join("");

function separateCssStyle(styles) {

  var css = {};
  var style = {};

  for (var name in styles) {
    if (specialCharacters.includes(name[0])) //|| !!name.match(new RegExp(`[${specialInnerCharacters}]`, "gi")))
      css[name] = styles[name];else style[name] = styles[name];
  }

  if (0 === Object.keys(css).length) css = null;

  if (0 === Object.keys(style).length) style = null;

  return { css: css, style: style };
}

// Convert a JS object to CSS string. Similar to React's output of CSS, extracted into a module.
function object2css(colors, obj) {
  obj = replaceColors(colors, obj);
  var keys = Object.keys(obj);
  //if (!keys.length) return ''
  var i = void 0,
      len = keys.length;
  var result = '';

  for (i = 0; i < len; i++) {
    var key = keys[i];
    var val = obj[key];
    result += (0, _hyphenateStyleName2.default)(key) + ':' + (0, _addPxToStyle2.default)(key, val) + "; ";
  }

  return result;
}

var prefixer = new _inlineStylePrefixer2.default();
var classes = {};

function hasKids(obj) {
  for (var name in obj) {
    if ("base" !== name && "object" === _typeof(obj[name])) return true;
  }
}

var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function makeid() {
  var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

  var text = "";

  for (var i = 0; i < side; i++) {
    text += possible.charAt(~~(Math.random() * possible.length));
  }return text;
}

function replacedStyleFn(_ref, args) {
  var styleCSS = _ref.styleCSS,
      styleFn = _ref.styleFn;


  var processedStyles = 1 === styleFn.length ? styleFn(args[0]) : styleFn(styleCSS, args[0]);

  var styleBase = Object.assign({}, styleCSS && styleCSS.base || styleCSS || {});
  /*
      for(const stylePropName in styleBase){
        if(specialCharacters.includes(stylePropName[0]))
        delete styleBase[stylePropName];
      }
  */
  var autoAddStyles = [],
      firstVal = args[1] || args[0];
  //console.log(args)
  if (!!firstVal && "object" === (typeof firstVal === 'undefined' ? 'undefined' : _typeof(firstVal))) {
    Object.keys(firstVal).forEach(function (cssName) {
      if (true === firstVal[cssName] && styleCSS && cssName in styleCSS) autoAddStyles.push(styleCSS[cssName]);
      //  else // to bind style value to output obj
      //    autoAddStyles.push({cssName:firstVal[cssName]})
    });
  }

  return Object.assign.apply(Object, [{}, styleBase].concat(autoAddStyles, [processedStyles]));
}

var userSetOptions = { named: true /* prefix:getVendorPrefix()*/ };

var replaceColors = function replaceColors(colors, style) {

  if (!colors) return style;
  var result = Object.assign({}, style);
  for (var key in result) {
    if (result[key] in colors) {
      result[key] = colors[result[key]];
    }
  }
  return result;
};

var genStyles = function genStyles(styleStuff, args, colors) {
  var userResult = replacedStyleFn(styleStuff, args);

  var swapedColor = replaceColors(colors, userResult);
  for (var name in swapedColor) {
    if (!specialCharacters.includes(name[0])) swapedColor[name] = prefixer.prefix({ a: swapedColor[name] }).a;
  }

  return swapedColor;
};

//+++++++++++++++++++++++++++++ { base:{}, foo: ()=> }
//++++++++++++++++++++++++++++++++++++++++++++++++++++
function topLevelWrapStyles(_styles) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var styleCSS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


  if ("object" !== (typeof _styles === 'undefined' ? 'undefined' : _typeof(_styles))) {
    throw new Error("Bad style values: " + JSON.stringify(_styles));
  }

  //+++++++++++++++++++++++++++++++++++++++ [ base, fn ]
  //++++++++++++++++++++++++++++++++++++++++++++++++++++
  if (Array.isArray(_styles)) {

    _styles = Object.assign({}, { base: _styles[0] }, _styles[1]);
  } else if (!("base" in _styles)) {

    var base = {},
        fns = {};

    //++++++++++++++ { table: {}, header:{} }, fn:{ ()=> }
    //++++++++++++++++++++++++++++++++++++++++++++++++++++

    var optionsIsFns = true;

    for (var prop in options) {
      if (options.hasOwnProperty(prop) && "function" !== typeof options[prop]) {
        optionsIsFns = false;
      }
    }

    if (optionsIsFns) {
      Object.assign(fns, options);
    }

    for (var _prop in _styles) {
      //+++++++++++++++++++++++++++ { table: {}, header:{} }
      //++++++++++++++++++++++++++++++++++++++++++++++++++++
      if ("object" === _typeof(_styles[_prop])) {
        base[_prop] = _styles[_prop];
        //++++++++++++++++++++++++++++++++++++++ { foo: ()=> }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++
      } else if ("function" === typeof _styles[_prop]) {
        fns[_prop] = _styles[_prop];
      } else {
        throw new Error("Bad style value: " + JSON.stringify(_styles[_prop]));
      }
    }
    _styles = Object.assign({}, { base: base }, fns);
  }

  var wrappedStyles = wrapStyles(_styles, options, styleCSS);
  wrappedStyles.colors = wrappedStyles.colors || options && options.colors || userSetOptions && userSetOptions.colors;
  return wrappedStyles;
}

function wrapStyles(_styles, options, styleCSS) {

  options = Object.assign({}, userSetOptions, options);
  //  const radium = !!options.radium;
  var caching = !!options.caching;
  var colors = options.colors;
  styleCSS = _styles.base || styleCSS;
  var replacedStyle = {};
  if (_styles.base) replacedStyle.base = styleCSS;

  Object.keys(_styles).concat(Object.keys(styleCSS)).filter(function (item, pos, a) {
    return a.indexOf(item) === pos;
  }).filter(function (styleName) {
    return "base" !== styleName;
  }).forEach(function (styleName) {

    var styleFn = _styles[styleName] || function () {};

    var cached = { key: null, value: null, source: [] };
    replacedStyle[styleName] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var elemName = args[0];
      if (Array.isArray(elemName) && elemName.hasOwnProperty("raw")) {

        elemName = elemName[0] || args[1];
        var inlineStyle = null; //replacedStyle[styleName]();

        var baseStyle = styleCSS[styleName] && styleCSS[styleName].base || {};
        for (var propN in styleCSS[styleName]) {
          if (specialCharacters.includes(propN[0]) || !!propN.match(new RegExp('[' + specialInnerCharacters + ']', "gi"))) {
            baseStyle[propN] = styleCSS[styleName][propN];
          }
        }
        //splict ":" and "@" from all over styles

        var _separateCssStyle = separateCssStyle(baseStyle),
            css = _separateCssStyle.css,
            style = _separateCssStyle.style;
        /*
        const cssPropNames = Object.keys(styleCSS[styleName])
                                   .filter(stylePropName => stylePropName[0] === "@" ||  stylePropName[0] === ":");
        */


        var randomClassName = "";

        //if(0 < cssPropNames.length){
        if (css) {

          randomClassName = "react-outline-";

          if (!global.__TEST__) randomClassName += makeid();

          classes[randomClassName] = style ? '.' + randomClassName + '{' + object2css(colors, style) + '}' : "";

          classes[randomClassName] = Object.keys(css).reduce(function (cssString, propName) {
            var styleContent = object2css(colors, styleCSS[styleName].base && styleCSS[styleName].base[propName] || styleCSS[styleName][propName]);
            if (propName[0] === "@") return cssString + (' ' + propName + '{ .' + randomClassName + '{ ' + styleContent + ' } } ');else if (propName[0] === ":") return ' .' + randomClassName + propName + '{ ' + styleContent + ' } ' + cssString;else return ' .' + randomClassName + ' ' + propName + '{ ' + styleContent + ' } ' + cssString;
            //  else // skip unknown prop
            //      return cssString
          }, classes[randomClassName]);

          inlineStyle = {};
        }

        // return <${elemName} ...props />
        return function (props) {
          var elemProps = Object.assign({}, props);

          var passedTrueProps = Object.keys(props).filter(function (name) {
            return props[name] === true && styleCSS[styleName] && name in styleCSS[styleName];
          });
          if (0 < passedTrueProps.length) {
            passedTrueProps = passedTrueProps.reduce(function (styleProps, name) {
              // If elem is a HTML type = Removed it Unknown prop `...` on <...> tag. Remove this prop from the element.
              if ("function" !== typeof elemName && "disabled" !== name) {
                delete elemProps[name];
              }
              return Object.assign(styleProps, _defineProperty({}, name, true));
            }, {});
          } else {
            passedTrueProps = null;
          }
          if (passedTrueProps || props.hasOwnProperty("style")) {
            if (props.style instanceof Object) passedTrueProps = Object.assign({}, props.style, passedTrueProps);
            elemProps.style = replacedStyle[styleName](props.style, passedTrueProps);
          } else {
            elemProps.style = inlineStyle || replacedStyle[styleName]();
          }

          if (options.named) elemProps.name = elemProps.name || styleName;

          elemProps.className = elemProps.className || "";
          elemProps.className += randomClassName || "";
          if ("" === elemProps.className) delete elemProps.className;

          return _react2.default.createElement(elemName || styleName, elemProps, elemProps && elemProps.children);
        }; //,props.children
      } // elem gen


      var styleStuff = { styleCSS: styleCSS[styleName], styleFn: styleFn /*,radium*/ };

      if (!caching) {
        return genStyles(styleStuff, args, colors);
      }
      // quick test
      if (cached.value && cached.source[0] === args[0] && cached.source[0] === args[1]) {
        return cached.value;
      }
      // deep test
      var key = "" + JSON.stringify(args[0]) + JSON.stringify(args[1]);
      if (key === cached.key) {
        return cached.value;
      }

      cached.key = key;
      cached.source[0] = args[0];
      cached.source[1] = args[1];
      cached.value = genStyles(styleStuff, args, colors);
      return cached.value;
    }; // END replacedStyle[styleName] = function(...args)

    if (0 < Object.keys(styleFn).length || hasKids(styleCSS[styleName])) {
      Object.assign(replacedStyle[styleName], wrapStyles(styleFn, options, styleCSS[styleName]));
    }
  });
  return replacedStyle;
}

function withOptions(options) {
  if (!options) throw new Error("Bad options values for react-outline:" + JSON.stringify(options));
  return function (_styles) {
    return topLevelWrapStyles(_styles, options);
  };
}

function setOptions(options) {
  if (!options) throw new Error("Bad options values for react-outline:" + JSON.stringify(options));
  if (options.colors) {
    topLevelWrapStyles.colors = options.colors;
  }
  Object.assign(userSetOptions, options);
}
function buildCssString() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var css = Object.keys(classes).map(function (className) {
    return classes[className];
  }).join(" ");
  css += props.children || "";
  css = css.replace(/\n/g, ' ').replace(/\s+/g, ' ');
  return css;
}
function Styles(props) {
  return _react2.default.createElement("style", {}, buildCssString(props));
}

Styles.toString = function () {
  return buildCssString();
};

var testing = {
  resetCSS: function resetCSS() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.getOwnPropertyNames(classes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var className = _step.value;
        delete classes[className];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
};

exports.default = topLevelWrapStyles;
exports.withOptions = withOptions;
exports.setOptions = setOptions;
exports.Styles = Styles;
exports.testing = testing;