"use strict";

requirejs([
    "jdc-utils.js",
    "cell.js",
    "dungeon.js",
], function() {

    var dungeon = new Dungeon("#dungeon");
    dungeon.render();

    // Debugging facilitators
    window.dungeon = dungeon;

});

