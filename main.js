"use strict";

requirejs([
    "jdc-utils.js",
    "cell.js",
    "dungeon.js",
    "player.js",
    "messages.js",
], function() {

    var dungeon = new Dungeon("#dungeon");
    var player = new Player();
    var msg = new Messages("#messages");

    // Attach events to respond to commands
    attachEvents({
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

    function attachEvents(keymap) {
        document.addEventListener("keypress", function(event) {
            if (keymap[event.key]) {
                keymap[event.key].call(window);
            }
            dungeon.render();
        });
    }

    dungeon.put(player,0,0);
    dungeon.render();

    // Debugging/testing
    window.dungeon = dungeon;
    window.show = function() { dungeon.render() };
    window.r = window.show;
    window.player = player;
    window.msg = msg;

});

