"use strict";

requirejs([
    "jdc-utils.js",
    "cell.js",
    "dungeon.js",
    "player.js",
], function() {

    var dungeon = new Dungeon("#dungeon");
    var player = new Player();

    dungeon.put(player,0,0);

    dungeon.render();

    // Debugging/testing
    window.dungeon = dungeon;
    window.show = function() { dungeon.render() };
    window.r = window.show;
    window.player = player;

});

