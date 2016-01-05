/**
Cell()
    Represents a dungeon cell

API
===
push(object) - Add an object to the cell
toHTML() - return an HTML representation (not text) of the cell
remove(object) - remove the given object from the cell
contains(object) - return true iff object exists in the cell, false otherwise
empty() - Remove everything in the cell, leaving it empty
clear() - Alias for empty()

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

/*
push(object)
    Add object to cell
*/
Cell.prototype.push = function(object) {
    var my = this;
    return my.contents.push(object)
}

/*
toHTML
    Return contents as some HTML*element
*/
Cell.prototype.toHTML = function() {
    var my = this;

    // Decide what, among the contents, should be shown
    var visibleitem = "";
    if (my.contents.length > 0) {
        var visibleitem = my.contents[0];
    }

    // Now we've got *what* to show, decide *how* to show it
    var output = "";
    if (visibleitem.toHTML) {
        output = visibleitem.toHTML()

    } else if (visibleitem.toString) {
        output = document.createElement("p");
        output.innerText = visibleitem.toString();

    };

    my.container.appendChild(output);
    return my.container;
}

/*
 remove(object)
    remove the given object from the cell
*/
Cell.prototype.remove = function(object) {
    var my = this;

    var index = my.contents.indexOf(object)
    if (index >= 0) {
        return my.contents.splice(index,1)
    } else {
        return null;
    }

}

/*
 contains(object)
    Return true iff the cell contains the given object, false otherwise
*/
Cell.prototype.contains = function(object) {
    var my = this;
    return my.contents.indexOf(object) !== -1
}

/*
empty()
    Remove everything in the cell, leaving it empty
*/
Cell.prototype.empty = function() {
    var my = this;
    return my.contents = [];
}

/*
clear()
    Alias for empty()
*/
Cell.prototype.clear = Cell.prototype.empty;
