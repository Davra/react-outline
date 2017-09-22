"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildCssString;
function buildCssString(classesValues) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var css = Object.keys(classesValues).map(function (className) {
    return classesValues[className];
  }).join(" ");
  css += props.children || "";
  css = css.replace(/\n/g, ' ').replace(/\s+/g, ' ');
  return css;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9idWlsZENzc1N0cmluZy5qcyJdLCJuYW1lcyI6WyJidWlsZENzc1N0cmluZyIsImNsYXNzZXNWYWx1ZXMiLCJwcm9wcyIsImNzcyIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJjbGFzc05hbWUiLCJqb2luIiwiY2hpbGRyZW4iLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFBd0JBLGM7QUFBVCxTQUFTQSxjQUFULENBQXdCQyxhQUF4QixFQUErQztBQUFBLE1BQVRDLEtBQVMsdUVBQUgsRUFBRzs7QUFDN0QsTUFBSUMsTUFBTUMsT0FBT0MsSUFBUCxDQUFZSixhQUFaLEVBQTJCSyxHQUEzQixDQUErQjtBQUFBLFdBQWFMLGNBQWNNLFNBQWQsQ0FBYjtBQUFBLEdBQS9CLEVBQXVFQyxJQUF2RSxDQUE0RSxHQUE1RSxDQUFWO0FBQ0NMLFNBQU9ELE1BQU1PLFFBQU4sSUFBa0IsRUFBekI7QUFDQU4sUUFBTUEsSUFBSU8sT0FBSixDQUFZLEtBQVosRUFBbUIsR0FBbkIsRUFBd0JBLE9BQXhCLENBQWdDLE1BQWhDLEVBQXdDLEdBQXhDLENBQU47QUFDQSxTQUFPUCxHQUFQO0FBQ0QiLCJmaWxlIjoiYnVpbGRDc3NTdHJpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZENzc1N0cmluZyhjbGFzc2VzVmFsdWVzLHByb3BzPXt9KXtcbiBsZXQgY3NzID0gT2JqZWN0LmtleXMoY2xhc3Nlc1ZhbHVlcykubWFwKGNsYXNzTmFtZSA9PiBjbGFzc2VzVmFsdWVzW2NsYXNzTmFtZV0gKS5qb2luKFwiIFwiKTtcbiAgY3NzICs9IHByb3BzLmNoaWxkcmVuIHx8IFwiXCI7XG4gIGNzcyA9IGNzcy5yZXBsYWNlKC9cXG4vZywgJyAnKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG4gIHJldHVybiBjc3Ncbn1cbiJdfQ==