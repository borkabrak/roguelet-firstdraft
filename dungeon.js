// dungeon.js
//  An object modelling a roguelike dungeon
//
//
//  * Random dungeon generation - ensure
//
"use strict";
var Dungeon = function(container, config) {
    var my = this;

    // Properties

    my.container = (
        // container can be a selector string

        typeof container === "string" ?
        document.querySelector(container) :
        container
    );

    my.size = ( config && config.size ) || {
        height: 10,
        width: 10
    }

    my.initialize();

    my.display(config.mode || "text");

}

// Set the dungeon's initial internal state
Dungeon.prototype.initialize = function() {
    var my = this;

    my.tiles = [[]];
    for (var y = 0; y < my.size.height; y++) {
        my.tiles[y] = [];
        for (var x = 0; x < my.size.width; x++) {
            my.tiles[y][x] = ".";
        }
    }
}

// Render the dungeon visually
Dungeon.prototype.display = function(mode) {
    var my = this;

        if (mode === "html" ) {
            console.log("container: %o", my.container);
            my.tiles.forEach(function(rowData) {

                var row = document.createElement("div");
                row.setAttribute("class", "row");
                rowData.forEach(function(cellData) {
                    var cell = document.createElement("div");
                    cell.setAttribute("class", "cell");
                    cell.innerHTML = cellData;
                    row.appendChild(cell);
                });
                my.container.appendChild(row);

            });

        } else {

            var pre = document.createElement("pre");
            my.tiles.forEach(function(row) {
                pre.innerHTML += row.map(function(element) {
                    return element + " ";
                }).join("") + "<br>";
            });

            my.container.appendChild(pre);
        }

}
