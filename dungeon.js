/*
Dungeon()
    An object modelling a roguelike dungeon

API
===
put(object, location)                        Store <object> in dungeon at <location>
render()                                     Display the current state of the dungeon
toHTML()                                     return HTML element containing the current dungeon
empty()                                      Set the dungeon state to empty
at()                                         get an array of the contents at a location
locate(object)                               Return the position of a given object in the dungeon
remove(object)                               Remove an object from whereever it is in the dungeon, or remove everything at the given location.
removeFrom(location)                         Remove everything at the given location
move(object, location)                       Move <object> from whereever it is to <location>

moveUp/moveDown/moveLeft/moveRight(object)   Move <object> from whereever it is one space in the given direction.
*/

"use strict";
var Dungeon = function(container, config) {
    var my = this;
    my.classname = "Dungeon";

    my.config = jdc.makeconfig(config, {
        height: 3,
        width:  3,

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

    // Initialize the contents to an empty dungeon
    my.contents = my.empty();

}

/*
put()
    place an object at a location in the dungeon

Signatures:
-----------
    put(object, {x: <x>, y:<y>})
    put(object, x, y)
*/
Dungeon.prototype.put = function(object, x, y) {
    var my = this;

    var position = jdc.normalizePosition(x, y);

    return my.contents[position.x][position.y].push(object);

}

/*
at(location)
    return the Cell at the given location

Signatures:
-----------
    at({x: <x>, y:<y>})
    at(x, y)
*/
Dungeon.prototype.at = function(x, y) {
    var my = this;
    var position = jdc.normalizePosition(x, y);
    return dungeon.contents[position.x][position.y];

}

/*
render()
    Display the current state of the dungeon
*/
Dungeon.prototype.render = function() {
    var my = this;

    my.container.innerHTML = "";
    my.container.appendChild(my.toHTML());

    return my;
}

/*
toHTML()
    build and return an HTML element containing the current dungeon
*/
Dungeon.prototype.toHTML = function() {
    var my = this;

    var container = document.createElement("div");

    for(var y = 0; y < my.config.height; y++) {
        var row = document.createElement("div");
        row.setAttribute("class", "dungeon-row");

        for(var x = 0; x < my.config.width; x++) {

            row.appendChild(my.contents[x][y].toHTML());

        }

        container.appendChild(row);

    }

    return container;
}

/*
empty
    Set the dungeon state to empty, initializing the contents structure in the
    process.
*/
Dungeon.prototype.empty = function() {
    var my = this;
    return jdc.seq(my.config.width).map(function() {
        return jdc.seq(my.config.height).map(function(){
            return new Cell();
        })
    })
}

/*
 locate
    return the location of a given object
*/
Dungeon.prototype.locate = function(object) {
    var my = this, x, y

    for(x=0; x < my.config.width; x++){
        for(y=0; y < my.config.height; y++){
            if (my.at(x,y).contains(object)) {
                return {x:x, y:y}
            }
        }
    }

    return undefined;

}

/*
remove(object)
    remove an object from whereever it is in the dungeon
*/
Dungeon.prototype.remove = function(object){
    var my = this
    var position = my.locate(object)
    return jdc.defined(position) ?
            my.at(position).remove(object) :
            undefined;
}

/*
removeFrom(location)
    Remove everything in the cell at the given location
*/
Dungeon.prototype.removeFrom = function(x, y) {
    var my = this
    var position = jdc.normalizePosition(x, y)
    return my.at(position).clear()
}

/*
move(object, location)
    move object to location
*/
Dungeon.prototype.move = function(object, x, y) {
    var my = this;
    return my.remove(object) ? my.put(object, x, y) : undefined;

}

