"use strict";
var GameController = {

    // Set behavior
    attachEvents: function(keymap) {
        document.addEventListener("keypress", function(event) {
            if (keymap[event.key]) {
                keymap[event.key].call(window);
            }
            dungeon.render();

            // After the player moves, allow a turn to pass for everything else in the dungeon.
            //entities.update();
        });
    }

}
