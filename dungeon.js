// dungeon.js
//  An object modelling a roguelike dungeon

"use strict";

/*
 * Dungeon()
 *
 * The dungeon's contents can be accessed via numerical indeces on the dungeon
 * object itself.  For example:
 *
 *      dungeon[x][y]
 *
 * is an array of everything that currently exists at that location in the dungeon
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
    my.config = jdc.makeconfig(config, {
        height: 10,
        width:  10,
    });

    // Properties
    my.container = (
        // container can be a selector string
        typeof container === "string" ?
        document.querySelector(container) :
        container
    );

    // Set tile values as numeric indeces on 'this'
    my.initialize();

    my.render();

}

// Render the dungeon visually
//
// This should handle displaying whatever value is at each numerical index of
// the dungeon, whether a character, a Player object, or what.
//
// It does so by calling a method on the value.  It calls, in order:
//
//  * render()
//  * toString()
//
//  It is the responsibility of the value to provide one of these means of
//  displaying itself, by returning HTML (possibly just a simple string) to do
//  so.
Dungeon.prototype.render = function() {
    var my = this;

    // Clear the board first
    my.container.innerHTML = "";

    // Now for each row..
    for(var y=0; y < my.config.height; y++) {

        // Get the array of row contents
        var rowData = my[y];

        // Create an HTML element for the row
        var row = document.createElement("div");
        row.setAttribute("class", "row");

        // For each cell in the row..
        rowData.forEach(function(cellData) {

            // Create an HTML element for the cell
            var cell = document.createElement("div");
            cell.setAttribute("class", "cell");

            // Select what to show out of all the items that exist at the cell.
            var cellItem = getTopItem(cellData);

            // Decide how to get the content to show itself
            cell.innerHTML = function(cellItem){

                // Does it respond to render()?
                if (cellItem.render) return cellItem.render()

                // How about toString()?
                if (cellItem.toString) return cellItem.toString()

                // Give up -- we don't know how to show this content.
                console.error("ERROR: Cannot display %o at dungeon cell %o", cellItem, cell);
                return "?"

            }(cellItem);
            
            // Attach the cell HTML element to the row
            row.appendChild(cell);

        });

        // Attach the HTML row to the DOM.
        my.container.appendChild(row);

    };

}

// Set numeric properties on the object, allowing the contents of a dungeon
// tile to be accessed like this:
//
//      dungeon[row][column]
//
// Each cell's value is an array of all the things that exist there.
Dungeon.prototype.initialize = function() {
    var my = this;

    for (var x = 0; x < my.config.width; x++) {
        my[x] = [];
        for (var y = 0; y < my.config.width; y++) {
            my[x][y] = [];
        }
    }
}

Dungeon.prototype.place = function(value, x, y) {
    var my = this;
    my[x][y].push(value);
    my.render();
}

// Move <object> towards <direction>
Dungeon.prototype.move = function(object, direction) {
}

// Aliases
//     for placing something in a dungeon square
Dungeon.prototype.assign = Dungeon.prototype.place;
Dungeon.prototype.set = Dungeon.prototype.place;

// Select what to show out of all the items that exist at the cell.
function getTopItem(itemArray) {
   
    var retval;

    if (itemArray.length < 1) { 
        retval = "." 
    } else {
        retval = itemArray[0]
    }

    return retval;

}
