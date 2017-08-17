export default class Runner {


    ASH_HEIGHT = 16.8; // 10cm units
    ASH_WEIGHT = 430; // 100g units

    entryField : HTMLElement;
    button: HTMLElement;
    responseArea : HTMLElement;

    /*
     * Creates a new Runner object.
     *
     * @param {HTMLElement} entryField The entryField in which you enter your responseArea
     * @param {HTMLElement} button The button to associate the handler with
     * @param {HTMLElement} responseArea The element where you want to display the results
     */
    constructor(field : HTMLElement, button : HTMLElement, response : HTMLElement) {
        this.entryField = field;
        this.button = button;
        this.responseArea = response;
    }

    /*
     * The main handler for when a button is clicked
     * Retrieves input from the entryField and queries it to Pokeapi
     *
     * @param {Runner} that The Runner instance to which this method belongs
     * @throws Any exceptions
     */
    findPokemon(that : Runner) {
        let input = that.prepareQuery(that.retrieveInput());
        that.getPokemonInfo(input).then( (result : string) => {
            that.displayResults(result);
        }).catch ( ( e : any) => {
            that.display(e);
        });
    }


    /*
     * Retrieves the Pokemon name (or number) after it has been entered into the entryField
     *
     * @return {string} the Pokemon name
     */
    retrieveInput(): string {
        let pokemon_name: string = (<HTMLInputElement>this.entryField).value;
        this.display("Searching " + pokemon_name + "...");

        return pokemon_name;
    }


    /*
     * Prepares the correct URL from the API to query
     *
     * @param {string} pokemon The Pokemon name to query
     */
    prepareQuery(pokemon : string) : string {
        let base_string = "http://pokeapi.co/api/v2/pokemon/";
        let query = base_string + pokemon.toLowerCase();
        return query;
    }


    /*
     * Sends the request to the API.
     * If the Pokemon is nonexistent, reject the Promise and display message
     *
     * @param {string} query the URL to get information from
     * @return {Promise<string|error>} the result of the query or error if failed
     */
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


    /*
     * Using data from query, decide if Pokemon is larger than Ash
     * and display results on page
     *
     * @param {string} data The string result of querying the page (i.e. JSONString)
     * @return {boolean} true if this pokemon is larger
     * @throws {error} If an error occurs when attempting to parse data
     */
    displayResults(data: string): boolean {

        let result: any = {};

        try {
            result = JSON.parse(data);
            if (result === {}) { return false; }

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


    /*
     * Capitalizes a word's first letter
     *
     * @param {string} n The word to capitalize
     */
    capitalize(n: string): string {
        return n.charAt(0).toUpperCase() + n.slice(1);
    }


    /*
     * Changes text in Runner's responseArea HTMLElement
     *
     * @param {string} res The string to display
     */
    display(res: string) {
        (this.responseArea).innerHTML = res;
    }

}