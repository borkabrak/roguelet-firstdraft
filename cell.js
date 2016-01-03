/**
 * Represents a dungeon cell
 *
 * Tracks all the objects currently at the cell, and handles displaying them properly
 */
"use strict";

var Cell = function(contents) {
    var my = this;

    my.container = document.createElement("div");
    my.container.setAttribute("class", "dungeon-cell");

    // Set contents
    if (typeof contents === "undefined") {
        // If nothing given, use empty array
        my.contents = []
    } else if (contents.constructor.name === "Array") {
        // If array given, use that
        my.contents = contents
    } else {
        // Anything else given, it's a single element
        my.contents = [contents]
    }

}

Cell.prototype.push = function(object) {
    var my = this;
    my.contents.push(object)
}

// toHTML
//  Return contents as some HTML*element
//
//  * Select what object among the contents should be displayed (Show entities instead of items on the floor, etc.)
//  * For the selected object, try to get it to show itself.  Otherwise, do our best to create HTML for it.
Cell.prototype.toHTML = function() {
    var my = this;
    my.container.innerText = my.contents.join(",");
    return my.container;
}
