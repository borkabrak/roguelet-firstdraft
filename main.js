"use strict";

requirejs([
    "script/jdc-utils.js",
    "dungeon.js",
], function() {

    var dungeon = new Dungeon();

    document.getElementById("dungeon").appendChild(dungeon.toHTML());

    // Debugging facilitators
    window.dungeon = dungeon;

});

