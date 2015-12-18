
window.retval = requirejs(["dungeon.js"], function() {

    var dungeon = new Dungeon("#dungeon", {
        mode: "html",
    });

});

// export for debugging
window.dungeon = dungeon
