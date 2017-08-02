"use strict";
const Runner_1 = require("./Runner");
let field = document.getElementById("pokemon");
let button = document.getElementById("submit");
let response = document.getElementById("response");
let r = new Runner_1.default(field, button, response);
button.onclick = () => { r.findPokemon(r); };
module.exports = {};
