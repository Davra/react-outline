"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (colors, style) {

  if (!colors) return style;
  var result = Object.assign({}, style);
  for (var key in result) {
    if (result[key] in colors) {
      result[key] = colors[result[key]];
    }
  }
  return result;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9yZXBsYWNlQ29sb3JzLmpzIl0sIm5hbWVzIjpbImNvbG9ycyIsInN0eWxlIiwicmVzdWx0IiwiT2JqZWN0IiwiYXNzaWduIiwia2V5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBQWUsVUFBVUEsTUFBVixFQUFpQkMsS0FBakIsRUFBdUI7O0FBRXBDLE1BQUcsQ0FBQ0QsTUFBSixFQUFZLE9BQU9DLEtBQVA7QUFDWixNQUFNQyxTQUFTQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFpQkgsS0FBakIsQ0FBZjtBQUNBLE9BQUksSUFBTUksR0FBVixJQUFpQkgsTUFBakIsRUFBeUI7QUFDdkIsUUFBR0EsT0FBT0csR0FBUCxLQUFlTCxNQUFsQixFQUF5QjtBQUN2QkUsYUFBT0csR0FBUCxJQUFjTCxPQUFPRSxPQUFPRyxHQUFQLENBQVAsQ0FBZDtBQUNEO0FBQ0Y7QUFDRCxTQUFPSCxNQUFQO0FBQ0QsQyIsImZpbGUiOiJyZXBsYWNlQ29sb3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNvbG9ycyxzdHlsZSl7XG5cbiAgaWYoIWNvbG9ycykgcmV0dXJuIHN0eWxlO1xuICBjb25zdCByZXN1bHQgPSBPYmplY3QuYXNzaWduKHt9LHN0eWxlKVxuICBmb3IoY29uc3Qga2V5IGluIHJlc3VsdCApe1xuICAgIGlmKHJlc3VsdFtrZXldIGluIGNvbG9ycyl7XG4gICAgICByZXN1bHRba2V5XSA9IGNvbG9yc1tyZXN1bHRba2V5XV07XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG4iXX0=