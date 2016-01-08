/*
 Messages()
   Display information to the user as text

*/

"use strict";

var Messages = function(container, config) {
    var my = this;

    my.contents = [];

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

Messages.prototype.say = function(text) {
    var my = this;

    var message = new Message(text);
    my.contents.push(message);
    my.container.appendChild(message.toHTML());

    return message;

}

Messages.prototype.add = Messages.prototype.say;

Messages.prototype.notify = function(text) {
    var my = this;

    var msg = my.say(text);
    setTimeout(function() {
        msg.container.style.opacity = "0";
        setTimeout(function() { msg.container.remove(); }, 1000);
    }, 3000);
}

Messages.prototype.clear = function() {
    var my = this;
    my.container.innerText = "";
}

