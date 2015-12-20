"use strict";

requirejs(["dungeon.js", "player.js"], function() {

    var dungeon = new Dungeon("#dungeon", {
        height: 5,
        width: 5
    });

    var player = new Player({
        name: "Smithee",
        icon: "player_icon.svg"
    });

    window.dungeon = dungeon;

});

