Raphael.el.addCursor = function() {
    var animateCursor,
    _this = this;
    if (this.rotation != null) {
	this.rotate(-this.rotation);
    }
    this.cursor = this.paper.text(0, 0, "|");
    this.updateCursor();
    if (this.rotation != null) {
	this.rotate(this.rotation);
	this.cursor.rotate(this.rotation, this.attrs.x, this.attrs.y);
    }
    this.cursor.attr({
	    'font-size': 24,
	    'font-family': 'Trebuchet MS'
	});
    this.cursor.visible = true;
    animateCursor = function() {
	var cursorText;
	_this.cursor.visible = !_this.cursor.visible;
	cursorText = _this.cursor.visible ? "|" : "";
	_this.cursor.attr({
		'text': cursorText
		    });
	return _this.updateCursor();
    };
    return this.cursor.blinker = setInterval((function() {
		return animateCursor();
	    }), 500);
};

Raphael.el.updateCursor = function() {
    var width;
    if (this.cursor == null) {
	return;
    }
    if (this.attr('text') === "") {
	width = 0;
    } else {
	width = this.getBBox(true).width / 2;
    }
    return this.cursor.attr({
	    x: this.attrs.x + width + 2,
	    y: this.attrs.y - 2
	});
};

Raphael.el.removeCursor = function() {
    if (this.cursor == null) {
	return;
    }
    clearInterval(this.cursor.blinker);
    $(this.cursor.node).remove();
    return delete this.cursor;
};