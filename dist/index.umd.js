(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.template = global.template || {}, global.template.min = global.template.min || {}, global.template.min.js = factory()));
})(this, (function () { 'use strict';

    function test() {
      console.log("test function");
    }

    return test;

}));
