"use strict";

requirejs([
    "script/jdc-utils.js",
    "dungeon.js",
    "player.js"
], function() {

    var dungeon = new Dungeon("#dungeon", {
        height: 10,
        width: 10
    });

    var player = new Player({
        name: "Specified Name",
        race: "dwarf",
        icon: "images/person.svg",
    });

    dungeon.place(player, 1, 1);

    var keymap = {
        j: function(){ dungeon.move("up", player) },
    }

    // Debugging facilitators
    window.dungeon = dungeon;

});

