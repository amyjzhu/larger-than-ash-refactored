/**
 * Created by gijin on 2017-08-02.
 */

export default class Runner {


    ASH_HEIGHT = 16.8; // 10cm units
    ASH_WEIGHT = 430; // 100g units

    field : HTMLElement;
    button: HTMLElement;
    response : HTMLElement;

    constructor(field : HTMLElement, button : HTMLElement, response : HTMLElement) {
        this.field = field;
        this.button = button;
        this.response = response;
    }

    findPokemon(that : Runner) {
        let input = that.retrieveInput();
        that.getPokemonInfo(input).then( (result : string) => {
            that.displayResults(result);
        }).catch ( ( e : any) => {
            that.display(e);
        });
    }

    retrieveInput(): string {
        // retrieves pokemon_name after something has been entered into the field
        let pokemon_name: string = (<HTMLInputElement>this.field).value;
        this.display("Searching " + pokemon_name + "...");

        return this.prepareQuery(pokemon_name);
    }

    prepareQuery(pokemon : string) : string {
        let base_string = "http://pokeapi.co/api/v2/pokemon/";
        let query = base_string + pokemon.toLowerCase();
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
            result = JSON.parse(data);
            if (result === {}) { return false; }

            // parse Pokemon data to get height and weight
            // then decide if Ash is bigger
            let h: number = <number> result["height"];
            let w: number = <number> result["weight"];
            let n: string = <string> result["name"];

            let isLargerThanAsh = false;
            isLargerThanAsh = (h > this.ASH_HEIGHT && w > this.ASH_WEIGHT);

            let name = this.capitalize(n);

            // display results
            this.display(name + " is " + ((isLargerThanAsh) ? "larger" : "not larger") + " than Ash!");
            return isLargerThanAsh;


        } catch (e) {
            throw (e.message);
        }
    }


    capitalize(n: string): string {
        return n.charAt(0).toUpperCase() + n.slice(1);
    }


    display(res: string) {
        this.response.innerHTML = res;
    }
}