"use strict";

var fahrenheitToCelsius = function fahrenheitToCelsius(temp) {
  return (temp - 32) / 1.8;
};

var celsiusToFahrenheit = function celsiusToFahrenheit(temp) {
  return temp * 1.8 + 32;
};

var add = function add(a, b) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(a + b);
    }, 2000);
  });
};

module.exports = {
  fahrenheitToCelsius: fahrenheitToCelsius,
  celsiusToFahrenheit: celsiusToFahrenheit,
  add: add
};