"use strict";

requirejs([
    "jdc-utils.js",
    "cell.js",
    "dungeon.js",
    "player.js",
    "messages.js",
    "message.js",
    "gamecontroller.js",
], function() {

    var dungeon = new Dungeon("#dungeon", {
        width: 6,
        height: 4,
        CSSWidth: "50%",
    });
    var player = new Player();
    var messages = new Messages("#messages");

    // Debugging/testing
    window.dungeon = dungeon;
    window.show = function() { dungeon.render() };
    window.r = window.show;
    window.player = player;
    window.messages = messages;

    dungeon.put(player,0,0);
    dungeon.render();

    // Start the game - by preparing to respond to instructions.
    GameController.attachEvents({
        j: function() {
            dungeon.move(player, "down");
        },

        k: function() {
            dungeon.move(player, "up");
        },

        h: function() {
            dungeon.move(player, "left");
        },

        l: function() {
            dungeon.move(player, "right");
        },
    });

});

