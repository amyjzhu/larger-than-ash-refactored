import Runner from "../src/Runner";
export = {};
import 'jasmine';

let r : Runner;

let button : HTMLElement;
let pokemon : HTMLInputElement;
let response : HTMLElement;

beforeEach( function() {
    button = document.createElement("button");
    button.setAttribute("id","submit");
    pokemon = document.createElement("input");
    response = document.createElement("span");;


    r = new Runner(pokemon, button, response);
});

describe("Test for the main.ts file", function() {

    it("Just do something", function() {
        expect(2).toEqual(2); // replace jasmine later with chai
    });

    it("Run main", function () {
        r.display("Hello");

    });


});

