"use strict";
const main_1 = require("../src/main");
require("jasmine");
beforeEach(() => {
    let script = document.createElement("script");
    let inline = document.createTextNode("let exports = {}");
    script.appendChild(inline);
    document.body.appendChild(script);
    let setup = '<input type="text" id="pokemon" value="">' +
        '<button id="submit"></button>' +
        '<div id="response"></div>';
    document.body.innerHTML = setup;
});
describe("Test for the main.ts file", () => {
    it("Just do something", function () {
        expect(1).toEqual(2); // replace jasmine later with chai
    });
    it("Run main", function () {
        let r = new main_1.default();
        r.display("Hello");
    });
});
module.exports = {};
