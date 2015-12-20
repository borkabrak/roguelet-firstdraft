// dungeon.js
//  An object modelling a roguelike dungeon

"use strict";

/*
 * Dungeon()
 *
 * At its most basic, this just implements a smart list of tiles, numerically
 * indexed, containing any sort of value that it can make sense to display.
 *
 * Accessing the value of a particular dungeon tile is simple:
 *
 *      dungeon[x][y]
 *
 * Parameters:
 *
 *  container
 *      the HTML element (or selector) within which to place the dungeon
 *
 *  config
 *      An object determining aspects of the dungeon.
 *
 *      Recognized keys [default value]:
 *
 *        width: [10]
 *          number of cells across
 *
 *        height: [10]
 *          number of cells tall
 *
 *
 * PROPERTIES
 *
 *  numerical indeces represent locations in the dungeon.  So, if dungeon is an
 *  instance of Dungeon, the top left tile is at dungeon[0][0];
 *
 *
*/
var Dungeon = function(container, config) {
    var my = this;
    config = (typeof config !== "undefined") ? config : {
        height: 10,
        width:  10,
    };

    // Properties
    my.container = (
        // container can be a selector string
        typeof container === "string" ?
        document.querySelector(container) :
        container
    );

    // Set properties - from config provided, or reasonable defaults
    my.height = config.height;
    my.width = config.width;

    // Set tile values as numeric indeces on 'this'
    my.initialize_tiles();

    my.render();

}

// Render the dungeon visually
//
// This should handle displaying whatever value is at each numerical index of
// the dungeon, whether a character, a Player object, or what.
//
// It does so by calling a method on the value.  It calls, in order:
//
//  * toString()
//  * render()
//
//  It is the responsibility of the value to provide one of these means of
//  displaying itself, by returning HTML (possibly just a simple string) to do
//  so.
Dungeon.prototype.render = function() {
    var my = this;

    my.container.innerHTML = "";

    for(var y=0; y < my.height; y++) {

        var rowData = my[y];

        var row = document.createElement("div");
        row.setAttribute("class", "row");
        rowData.forEach(function(cellData) {
            var cell = document.createElement("div");
            cell.setAttribute("class", "cell");

            if (cellData.toString) {
                cell.innerHTML = cellData.toString()
            } else if (cellData.render) {
                cell.innerHTML = cellData.render()
            } else {
                cell.innerHTML = "?"
                console.error("ERROR: Cannot display %o at dungeon cell %o", cellData, cell);
            }

            row.appendChild(cell);
        });
        my.container.appendChild(row);

    };

}

// Set numeric properties on the object, allowing a dungeon tile to be
// accessed like this:
//
//      dungeon[row][column]
//
Dungeon.prototype.initialize_tiles = function() {
    var my = this;

    for (var y = 0; y < my.height; y++) {
        my[y] = [];
        for (var x = 0; x < my.width; x++) {
            my[y][x] = ".";
        }
    }
}

Dungeon.prototype.setTile = function(value, x, y) {
    var my = this;

    my[y][x] = value;

    my.render();
}
