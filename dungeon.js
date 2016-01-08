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
        CSSWidth: "80%",
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

    my.container.style.width = my.config.CSSWidth;

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

    var position = my.normalizePosition(x, y);

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
    var position = my.normalizePosition(x, y);

    // If the location does not exist, the contents are necessarily undefined
    if ( !  (
            jdc.defined(dungeon.contents[position.x])
            &&
            jdc.defined(dungeon.contents[position.y])
            )
    ) return undefined;

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
    var position = my.normalizePosition(x, y)
    return my.at(position).clear()
}

/*
move(object, location)
    move object to location.x, location.y

move(object, x, y)
    move object to x, y

move(object, direction)
    move object one space in the specified direction
    directions take the form "up", "left", "down-right", etc.

*/
Dungeon.prototype.move = function(object, x, y) {
    var my = this;

    // if the given location is a single string, interpret it as a direction.
    if (typeof x === "string" && typeof y === "undefined") {

        var current_position = my.locate(object);
        var direction = x;

        x = current_position.x + function() {
            if (/left/.test(direction))  return -1;
            if (/right/.test(direction)) return  1;
            return 0;
        }()

        y = current_position.y + function() {
            if (/up/.test(direction))   return -1;
            if (/down/.test(direction)) return  1;
            return 0;
        }()

    }

    // NOTE: It might be good to have a function to return a validated address
    //       Maybe add this functionality to normalizeAddress(), and call it to get the target?
    //
    // Adjust for out-of-bounds attempted moves
    if (! my.at(x,y) ) { // Does target location exist?
        switch(true) {
            case (x < 0):
                x = 0
                break;
            case (x >= my.config.width):
                x = my.config.width - 1
                break;
            case (y < 0):
                y = 0
                break;
            case (y >= my.config.height):
                y = my.config.height - 1
                break;
        }
        messages.notify("Out of bounds!");
    }

    return my.remove(object) ? my.put(object, x, y) : undefined;

}

/*
normalizePosition()
    Allow flexible expression of a dungeon location either as a single
    object with x and y properties, or as two values indicating x and y
    separately.

    Returns one object with corresponding x and y properties.
*/
Dungeon.prototype.normalizePosition = function(arg1, arg2) {

    if (typeof arg1 === "undefined") { return { x: undefined, y: undefined} }

    if (typeof arg1.x !== "undefined" && typeof arg1.y !== "undefined") {
        // arg1 has both x and y properties
        return { x: arg1.x, y: arg1.y };
    }

    if (typeof arg1 === "number" && typeof arg2 === "number"){
        // arg1 and arg2 are both numbers.  Use them as x and y, respectively.
        return { x: arg1, y: arg2 }
    }

    console.error("normalizePosition(): I Don't know how to interpret these arguments as dungeon coordinates: (%o, %o)", arg1, arg2);
    return null;

}
