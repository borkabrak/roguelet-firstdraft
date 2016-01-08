/*
Message()
An HTML representation of a bit of text
   Each text entry has an expiration, after which it fades away.
*/
var Message = function(text) {
    var my = this;

    my.text = text;
    my.container = document.createElement("p");
    my.container.setAttribute("class", "message");
    my.container.style.transition = "1000ms";
    my.container.innerText = text;

}

Message.prototype.toHTML = function() {
    var my = this;
    return my.container;
}

Message.prototype.toString = function() {
    var my = this;
    return my.text;
}

