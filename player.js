/*
Player

API
===

Player() - create and return a new player

*/
"use strict";

var Player = function(config) {
    var my = this;
    my.classname = "Player";

    // Specify defaults
    my.config = jdc.makeconfig(config, {
        name: "Biff?",
        icon: "images/person.svg"
    });

}

/*
toString - return a string representation of the player
*/
Player.prototype.toString = function() {
    var my = this;
    return my.config.name;
}

/*
toHTML - return an HTML object representing the player
*/
Player.prototype.toHTML = function() {
    var my = this;

    var img = document.createElement("img");
    img.setAttribute("src", my.config.icon);

    my.container = document.createElement("div");
    my.container.setAttribute("class", "player");
    my.container.appendChild(img);
    return my.container;

}

