/*
 * jdc - a namespace for various utility functions of my own devising
 */

"use strict";

var jdc = {

    makeconfig: function(config, defaults) {
        /**
        makeconfig

            Return an object containing all the properties of both 'config' and 'defaults'.
            Where duplicates occur, use the one from 'config'.

            EXAMPLE:
            --------
            // Object properties can be optionally specified upon instantiation.
            var MyObject = function(config) {
                var defaults = {
                    height: 10,
                    width:  10,
                }

                this.config = makeconfig(config, defaults);

            }

        */

        var retval = {};

        for ( var property in defaults) {
            retval[property] = defaults[property];
        }

        for ( var property in config ) {
            retval[property] = config[property];
        }

        return retval;

    },

    // seq (sequence)
    //
    // Return an array of integers in a particular sequence
    //
    //      * Two parameters represent start and endpoints (non-inclusive)
    //              (4,10)      => [4,5,6,7,8,9]
    //
    //      * One parameter, x, returns 0..x
    //              (10)        => [0,1,2,3,4,5,6,7,8,9]
    //
    //      * 'step' is the difference between each element (default: 1)
    //              (4,10,2)    => [4,6,8]
    //
    //      * If the second parameter is less than the first, return a
    //      descending sequence
    //              (10,4)      => [10,9,8,7,6,5]
    //
    //      * You can give a negative step, but its absolute value is all that
    //      matters.  This prevents confusion (and endless loops), i.e., when
    //      counting down, do we make step negative?  Doesn't matter!
    //              (10,4,-2)   => [10,8,6]
    //              (10,4,2)    => [10,8,6]
    //              (4,10,-2)   => [4,6,8]  This happens too, but do you care?
    //
    //      -jdc 11/2/2012
    seq: function(x, y, step){
        var start = y ? x : 0;
        var end = y || x;
        step = (Math.abs(step) || 1) * ( (end > start) ? 1 : -1 );

        for(var i = start, range = []; (end > start) ? (i < end) : (i > end); i += step){
            range.push(i); }

        return range;
    },

    defined: function(arg) {
        return (typeof arg !== "undefined")
    },

    ancestors: function(object) {

        var retval = [];

        do {
            retval.push(object);
            //object = object.prototype;
            object = Object.getPrototypeOf(object);
        } while (object !== null);

        return retval;
    },
}

if (! Array.prototype.contains) {
    Array.prototype.contains = function(element) {
        return this.indexOf(element) !== -1
    }
}
