// dungeon.js
//  An object modelling a roguelike dungeon

"use strict";

/*
 * Dungeon()
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
 *  at()                                         get an array of the contents at a location
 *  toHTML()                                     return HTML element containg the current dungeon
 *  remove(object | location)                    remove an object from whereever it is in the dungeon, or remove everything at the given location.
 *  put(object, location)                        Store <object> in dungeon at <location>
 *  move(object, location)                       Move <object> from whereever it is to <location>
 *  moveUp/moveDown/moveLeft/moveRight(object)   Move <object> from whereever it is one space in the given direction.
*/
var Dungeon = function(container, config) {
    var my = this;

    my.config = jdc.makeconfig(config, {
        height: 5,
        width:  5,
    });

    // Set container
    if (typeof container === "string") {
        // given container is a selector string
        my.container = document.querySelector(container)
    } else if (typeof container === "undefined") {
        // Container not given - let it be specifiable on the config
        my.container = my.config.container;
    } else {
        // Assume that the container given is the HTML element itself
        my.container = container;
    }

    // Set contents to an empty dungeon
    my.contents = my.initialize_contents();

    return my;

}

Dungeon.prototype.put = function(object, arg2, arg3) {
    var x, y, my = this;

    /* Use cases:
            put(object, location)
        Where location contains the x and y properties defining the location

        OR

            put(object, x, y)
        Where the x and y properties are separately provided
    */

    if (typeof arg2.x !== "undefined" && typeof arg2.y !== "undefined") {
        // arg2 has both x and y properties
        x = arg2.x, y = arg2.y;

    } else if (typeof arg2 === "number" && typeof arg3 === "number"){
        // arg2 and arg3 are both numbers.  Use them as x and y, respectively.
        x = arg2;
        y = arg3;

    } else {
        console.log("Don't know how to interpret arguments in put(%o)", arguments);
        x = 0, y = 0;

    }

    my.contents[x][y].push(object);

    my.render();

    return my;
}

Dungeon.prototype.render = function() {
    var my = this;

    my.container.innerHTML = "";
    my.container.appendChild(my.toHTML());

    return my;
}

Dungeon.prototype.toHTML = function() {
    var my = this;

    var container = document.createElement("div");

    for(var y = 0; y < my.config.width; y++) {
        var row = document.createElement("div");
        row.setAttribute("class", "dungeon-row");

        for(var x = 0; x < my.config.height; x++) {
            var cell = document.createElement("div");
            cell.setAttribute("class", "dungeon-cell");
            cell.style.height = (36 / my.config.height).toString() + "em";

            // Get the contents at the current location
            cell.innerHTML = show(my.contents[x][y]);

            row.appendChild(cell);
        }
        container.appendChild(row);
    }

    return container;
}

// Return an array representing an empty dungeon
// Elements in the dungeon should be addressable like:
//   contents[x][y];
//
// Where x is the horizontal distance from the origin (top left), and y is the
// vertical distance.
//
// The value at each location is an array of everything that exists in the dungeon at that location.
// If the location is empty, then its value is an empty array.
Dungeon.prototype.initialize_contents = function() {
    var my = this;

    return jdc.seq(my.config.width).map(function() {
        return jdc.seq(my.config.height).map(function(){
            return []
        })
    })
}

// show
//  Show what exists at a particular location in the dungeon.
//
//  Input: an array of objects at the location
//
//  * Select what object among the contents should be displayed (Show entities instead of items on the floor, etc.)
//  * For the selected object, try to get it to show itself.  Otherwise, do our best to create HTML for it.
function show(contents) {

    if (contents.length === 0) {
        return " ";
    }

    // Determine what should be shown
    // (For now, just show the first item)
    var topitem = contents[0];

    if (topitem.toHTML) return topitem.toHTML();
    if (topitem.render) return topitem.render();
    if (topitem.toString()) return topitem.toString();

    console.log("Can't show object: %o", topitem);
    return '?';

}
