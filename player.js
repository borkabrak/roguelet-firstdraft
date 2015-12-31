"use strict";

var Player = function(config) {
    var my = this;

    // Specify defaults
    my.config = jdc.makeconfig(config, {
        name: "Default Name",
        icon: "default.png"
    });

}

Player.prototype.render = function() {
    var my = this;
    return "<img src='" + my.config.icon + "'>";
}

Player.prototype.toString = function() {
    var my = this;
    return  my.name;
}
