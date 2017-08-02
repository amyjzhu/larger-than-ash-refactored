"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let field = document.getElementById("pokemon");
let button = document.getElementById("submit");
class Runner {
    constructor() {
        this.ASH_HEIGHT = 16.8; // 10cm units
        this.ASH_WEIGHT = 430; // 100g units
    }
    findPokemon(that) {
        let input = that.retrieveInput();
        that.getPokemonInfo(input).then((result) => {
            that.displayResults(result);
        }).catch((e) => {
            that.display(e);
        });
    }
    retrieveInput() {
        //retrieveInput = function () {
        // retrieves pokemon_name after something has been entered into the field
        let pokemon_name = field.value;
        this.display("Searching " + pokemon_name + "...");
        if (/^\s*&/.test(pokemon_name)) {
            this.display("Please enter an input into the text field!");
        }
        // prepare query on pokeapi
        let base_string = "http://pokeapi.co/api/v2/pokemon/";
        let query = base_string + pokemon_name.toLowerCase();
        return query;
    }
    getPokemonInfo(query) {
        let http = require("http");
        return new Promise((fulfill, reject) => {
            http.get(query, (res) => {
                const { statusCode } = res;
                if (statusCode !== 200) {
                    reject("Sorry, that Pokemon doesn't seem to exist!");
                }
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    fulfill(data);
                });
                res.on('error', (err) => {
                    reject("There was an error with the data.");
                });
            });
        });
    }
    displayResults(data) {
        let result = {};
        try {
            let parsedData = JSON.parse(data);
            result = parsedData;
            // parse Pokemon data to get height and weight
            // then decide if Ash is bigger
            if (result !== {}) {
                let h = result["height"];
                let w = result["weight"];
                let n = result["name"];
                let isLargerThanAsh = false;
                isLargerThanAsh = (h > this.ASH_HEIGHT && w > this.ASH_WEIGHT);
                let name = this.capitalize(n);
                // display results
                this.display(name + " is " + ((isLargerThanAsh) ? "larger" : "not larger") + " than Ash!");
                return isLargerThanAsh;
            }
        }
        catch (e) {
            throw (e.message);
        }
        return false;
    }
    capitalize(n) {
        return n.charAt(0).toUpperCase() + n.slice(1);
    }
    display(res) {
        document.getElementById("response").innerHTML = res;
    }
}
exports.default = Runner;
let r = new Runner();
button.onclick = () => { r.findPokemon(r); };
