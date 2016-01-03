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

}

Dungeon.prototype.put = function(object, arg2, arg3) {
    var my = this;
    var x;
    var y;

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

            row.appendChild(my.contents[x][y].toHTML());

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
// The value at each location is a Cell object
Dungeon.prototype.initialize_contents = function() {
    var my = this;

    return jdc.seq(my.config.width).map(function() {
        return jdc.seq(my.config.height).map(function(){
            return new Cell();
        })
    })
}
