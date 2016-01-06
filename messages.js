/*
 Messages()
   Display information to the user as text
*/

"use strict";

var Messages = function(container, config) {
    var my = this;

    my.config = jdc.makeconfig(config);

    // Set container
    if (typeof container === "string") {
        // given container is a selector string
        my.container = document.querySelector(container)

    } else if (typeof container === "undefined") {
        // Container not given - let it be specifiable on the config
        my.container = my.config.container;

    } else {
        // Assume that the container given is the HTML element itself
        my.container = container;

    }
}

Messages.prototype.say = function(message) {
    var my = this;

    var paragraph = document.createElement("p");
    paragraph.innerText = message;

    my.container.appendChild(paragraph);

}

Messages.prototype.clear = function() {
    var my = this;
    my.container.innerText = "";
}
