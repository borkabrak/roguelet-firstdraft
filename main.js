"use strict";

requirejs([
    "script/jdc-utils.js",
    "dungeon.js",
], function() {

    var dungeon = new Dungeon("#dungeon").render();

    // Debugging facilitators
    window.dungeon = dungeon;

});

