let field = document.getElementById("pokemon");
let button = document.getElementById("submit");


export default class Runner {


    ASH_HEIGHT = 16.8; // 10cm units
    ASH_WEIGHT = 430; // 100g units

    constructor() {  }

    findPokemon(that : Runner) {
        let input = that.retrieveInput();
        that.getPokemonInfo(input).then( (result : string) => {
            that.displayResults(result);
        }).catch ( ( e : any) => {
            that.display(e);
        });
    }

    retrieveInput(): string {
    //retrieveInput = function () {
        // retrieves pokemon_name after something has been entered into the field
        let pokemon_name: string = (<HTMLInputElement>field).value;
        this.display("Searching " + pokemon_name + "...");

        if (/^\s*&/.test(pokemon_name)) {
            this.display("Please enter an input into the text field!");
        }

        // prepare query on pokeapi
        let base_string = "http://pokeapi.co/api/v2/pokemon/";
        let query = base_string + pokemon_name.toLowerCase();

        return query;
    }


    getPokemonInfo(query: string): Promise<string> {
        let http = require("http");
        return new Promise((fulfill, reject) => {
            http.get(query, (res: any) => {

                const {statusCode} = res;
                if (statusCode !== 200) {
                    reject("Sorry, that Pokemon doesn't seem to exist!");
                }

                let data: string = '';
                res.on('data', (chunk: string) => {
                    data += chunk;
                });

                res.on('end', () => {
                    fulfill(data);
                });

                res.on('error', (err: any) => {
                    reject("There was an error with the data.");
                })
            }
            );
        })
    }


    displayResults(data: string): boolean {

        let result: any = {};

        try {
            let parsedData = JSON.parse(data);
            result = parsedData;

            // parse Pokemon data to get height and weight
            // then decide if Ash is bigger
            if (result !== {}) {
                let h: number = <number> result["height"];
                let w: number = <number> result["weight"];
                let n: string = <string> result["name"];

                let isLargerThanAsh = false;
                isLargerThanAsh = (h > this.ASH_HEIGHT && w > this.ASH_WEIGHT);

                let name = this.capitalize(n);

                // display results
                this.display(name + " is " + ((isLargerThanAsh) ? "larger" : "not larger") + " than Ash!");
                return isLargerThanAsh;
            }

        } catch (e) {
            throw (e.message);
        }

        return false;
    }


    capitalize(n: string): string {
        return n.charAt(0).toUpperCase() + n.slice(1);
    }


    display(res: string) {
        document.getElementById("response").innerHTML = res;
    }
}

let r = new Runner();
button.onclick = () => { r.findPokemon(r) };
