"use strict";
const Runner_1 = require("../src/Runner");
require("jasmine");
let r;
let button;
let pokemon;
let response;
beforeEach(function () {
    button = document.createElement("button");
    button.setAttribute("id", "submit");
    pokemon = document.createElement("input");
    response = document.createElement("span");
    ;
    r = new Runner_1.default(pokemon, button, response);
});
describe("Test for the main.ts file", function () {
    it("Just do something", function () {
        expect(2).toEqual(2); // replace jasmine later with chai
    });
    it("Run main", function () {
        r.display("Hello");
    });
});
module.exports = {};
