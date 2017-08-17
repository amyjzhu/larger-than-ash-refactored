import Runner from "../src/Runner";
export = {};
import 'jasmine';

let r : Runner;

let button : HTMLElement;
let pokemon : HTMLInputElement;
let response : HTMLElement;



function returnInput(name : string) : any {
    if (name == "Charizard") {
        return {"name": "charizard", "height": 17, "weight": 905};
    } else if (name == "Pidgey") {
        return {"name": "pidgey", "height": 3, "weight": 18};
    } else {
        return {"detail": "Not found."};
    }
}





/*
 * This creates the mock elements that allow us to create a Runner - don't change!
 */
beforeEach( function() {
    button = document.createElement("button");
    button.setAttribute("id","submit");
    pokemon = document.createElement("input");
    response = document.createElement("span");


    r = new Runner(pokemon, button, response);
});


describe("Tests for Runner class", function() {

    it("Test constructor", function() {
       expect(r.button).toEqual(button);
       expect(r.entryField).toEqual(pokemon);
       // expect(r.entryField).toBe(HTMLInputElement);
       expect(r.responseArea).toEqual(response);
    });

    describe("Tests for retrieveInput", function () {

        it("Should be able to retrieve a valid input", function () {
            let expected = "sljkdfjefmsfd";
            pokemon.value = "sljkdfjefmsfd";

            let actual = r.retrieveInput();

            expect(actual).toEqual(expected);
        });

        /*

        it("Should be able to retrieve invalid inputs", function () {
            pokemon.value = null;

            let actual = r.retrieveInput();

            expect(actual).not.toBeNull();
            expect(actual).toBe("");

            pokemon.value = undefined;

            actual = r.retrieveInput();

            expect(actual).not.toBeUndefined();
            expect(actual).toBe("");
        });
        */

        it("Should be able to retrieve an empty input", function () {
            let actual = r.retrieveInput();

            expect(actual).toEqual("");

            pokemon.value = "";

            actual = r.retrieveInput();

            expect(actual).toEqual("");

        });


    });
});

