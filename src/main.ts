import Runner from "./Runner";
export = {};

let field : HTMLElement = document.getElementById("pokemon");
let button : HTMLElement = document.getElementById("submit");
let response: HTMLElement = document.getElementById("response");

let r = new Runner(field,button,response);
button.onclick = () => { r.findPokemon(r) };
