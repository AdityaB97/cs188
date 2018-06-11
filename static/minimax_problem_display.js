var ChanceNodeDrawer, CirclularNodeDrawer, MaxNodeDrawer, MinNodeDrawer, MinimaxProblemDisplay, NodeDrawer, NonZeroSumFirstPlayerNodeDrawer, NonZeroSumNodeDrawer, NonZeroSumSecondPlayerNodeDrawer, NonZeroSumValueNodeDrawer, Point, QuadrilateralNodeDrawer, TextNodeDrawer, ValueNodeDrawer, root, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MinimaxProblemDisplay = (function(_super) {
	__extends(MinimaxProblemDisplay, _super);

	function MinimaxProblemDisplay(state, submission, evaluation, container, submissionField, parameters) {
	    var MIN_H_SPACING, MIN_V_SPACING, RATIO, child, id, node, numActionsForLevel, queue, value, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
	    this.state = state;
	    this.submission = submission;
	    this.evaluation = evaluation;
	    this.container = container;
	    this.submissionField = submissionField;
	    this.parameters = parameters != null ? parameters : {};
	    this.resize = __bind(this.resize, this);
	    MinimaxProblemDisplay.__super__.constructor.call(this, this.state, this.submission, this.evaluation, this.container, this.submissionField, this.parameters);
	    _ref = this.evaluation;
	    for (id in _ref) {
		value = _ref[id];
		if (this.submission[id] == null) {
		    this.submission[id] = null;
		}
	    }
	    this.numActionsPerLevel = this.parameters.numActionsPerLevel;
	    this.numLevels = this.numActionsPerLevel.length;
	    this.alphabeta = this.parameters.problemType === 'alphabeta';
	    this.expectimax = this.parameters.problemType === 'expectimax';
	    this.nonzerosum = this.parameters.problemType === 'nonzerosum';
	    this.ordering = this.parameters.problemType === 'ordering';
	    this.numLeaves = 1;
	    _ref1 = this.numActionsPerLevel;
	    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
		numActionsForLevel = _ref1[_i];
		this.numLeaves *= numActionsForLevel;
	    }
	    if (this.nonzerosum) {
		this.problem = new NonZeroSumProblem(this.state, this.parameters);
	    } else {
		this.problem = new MinimaxProblem(this.state, this.parameters);
	    }
	    this.rootNode = this.problem.rootNode;
	    this.nodes = this.problem.nodes;
	    this.createSubmission();
	    this.updateSubmission();
	    this.PADDING = 30;
	    RATIO = 1.618;
	    this.NODE_HEIGHT = 40;
	    this.NODE_WIDTH = this.NODE_HEIGHT * RATIO;
	    this.verticalSpacingFactor = 3;
	    if (this.alphabeta) {
		this.verticalSpacingFactor = 5;
	    }
	    MIN_H_SPACING = this.NODE_WIDTH * .2;
	    MIN_V_SPACING = this.NODE_HEIGHT * this.verticalSpacingFactor;
	    this.MIN_PAPER_HEIGHT = this.numLevels * (MIN_V_SPACING + this.NODE_HEIGHT) + this.PADDING * 1;
	    this.MIN_PAPER_WIDTH = this.NODE_WIDTH * this.numLeaves + MIN_H_SPACING * (this.numLeaves - 1) + this.PADDING * 2;
	    this.showResult = this.evaluation != null;
	    this.editable = !this.showResult;
	    this.liveFeedback = (_ref2 = this.parameters.liveFeedback) != null ? _ref2 : false;
	    if (this.liveFeedback) {
		this.liveFeedbackValues = {};
		if (this.alphabeta) {
		    this.problem.rootNode.getValueAlphaBeta(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
		} else {
		    this.problem.rootNode.getValue();
		}
		queue = [this.problem.rootNode];
		while (queue.length > 0) {
		    node = queue.pop();
		    if (this.alphabeta) {
			_ref3 = node.children;
			for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
			    child = _ref3[_j];
			    this.liveFeedbackValues[child.id + '_alpha'] = child.alpha;
			    this.liveFeedbackValues[child.id + '_beta'] = child.beta;
			}
		    }
		    if (node.constructor.name !== "ValueNode") {
			this.liveFeedbackValues[node.id] = node.value;
			_ref4 = node.children;
			for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
			    child = _ref4[_k];
			    queue.push(child);
			}
		    }
		}
		_ref5 = this.liveFeedbackValues;
		for (id in _ref5) {
		    value = _ref5[id];
		    if (value === Number.POSITIVE_INFINITY) {
			this.liveFeedbackValues[id] = "i";
		    }
		    if (value === Number.NEGATIVE_INFINITY) {
			this.liveFeedbackValues[id] = "-i";
		    }
		    if (value == null) {
			this.liveFeedbackValues[id] = 'x';
		    }
		}
	    }
	}

	MinimaxProblemDisplay.prototype.isModifierKey = function(event) {
	    return event.ctrlKey || event.altKey || event.metaKey;
	};

	MinimaxProblemDisplay.prototype.isDirection = function(event) {
	    return event.which === 76 || event.which === 82;
	};

	MinimaxProblemDisplay.prototype.isInfinity = function(event) {
	    return event.which === 105 || event.which === 73;
	};

	MinimaxProblemDisplay.prototype.isPrune = function(event) {
	    return event.which === 120 || event.which === 88;
	};

	MinimaxProblemDisplay.prototype.isMinus = function(event) {
	    var minus;
	    minus = event.which === 109 || event.which === 189 || event.which === 45 || event.which === 173;
	    return minus;
	};

	MinimaxProblemDisplay.prototype.isNumericKey = function(event) {
	    var numPad, numberRow;
	    numPad = event.which > 95 && event.which < 106;
	    numberRow = event.which > 47 && event.which < 58 && event.shiftKey === false;
	    return numPad || numberRow;
	};

	MinimaxProblemDisplay.prototype.isNavigationKey = function(event) {
	    return (event.which === 8) || (event.which === 9) || (event.which >= 33 && event.which <= 40) || (event.which === 46);
	};

	MinimaxProblemDisplay.prototype.render = function() {
	    var correct, status,
	    _this = this;
	    this.container.css('overflow', 'auto');
	    this.paperContainer = $('<div>');
	    this.container.append(this.paperContainer);
	    if (!this.nonzerosum) {
		this.inputContainer = $('<div>').css({
			'text-align': 'center',
			'height': '40px'
		    });
		this.inputField = $('<input>').attr('type', 'text').css({
			'text-align': 'center',
			'width': '100%'
		    });
		this.inputContainer.append(this.inputField);
		this.container.append(this.inputContainer);
		this.inputField.keydown(function(event) {
			var value;
			switch (event.which) {
			case 10:
			case 13:
			    event.preventDefault();
			    return _this.inputField.blur();
			default:
			    if ((_this.alphabeta && _this.isInfinity(event)) || _this.isNumericKey(event) || _this.isMinus(event) || _this.isPrune(event) || _this.isDirection(event)) {
				value = _this.inputField.val();
				if (_this.isInfinity(event)) {
				    if (!((value === "") || (value === "-"))) {
					return event.preventDefault();
				    }
				} else if (_this.isMinus(event) || _this.isPrune(event)) {
				    if (!(value === "")) {
					return event.preventDefault();
				    }
				} else {
				    if ((value === "i") || (value === "-i") || (value === "x") || value.length >= 3) {
					return event.preventDefault();
				    }
				}
			    } else if (!(_this.isNavigationKey(event) || _this.isModifierKey(event))) {
				return event.preventDefault();
			    }
			}
		    });
		this.inputField.hide();
	    }
	    this.paper = new ScaleRaphael(this.paperContainer[0], this.MIN_PAPER_WIDTH, this.MIN_PAPER_HEIGHT);
	    this.createDrawers();
	    this.draw();
	    this.resize();
	    if (this.showResult) {
		if (!this.nonzerosum) {
		    this.inputContainer.remove();
		}
		correct = this.evaluation['_all_'];
		if (correct) {
		    status = 'correct';
		} else {
		    status = 'incorrect';
		}
		if (!this.ordering) {
		    this.statusContainer = $("<div>").html('All fields you filled out correctly are outlined in green and all fields you filled out incorrectly are outlined and shaded in red.');
		} else if (correct) {
		    this.statusContainer = $("<div>");
		} else {
		    this.statusContainer = $("<div>").html('You had some incorrect fields. You must reset the problem before entering in new values.');
		}
		this.correctness = $('<p>').addClass('status');
		this.statusContainer.append(this.correctness);
		this.container.append(this.statusContainer);
		this.statusContainer.addClass(status);
		return this.correctness.html(status);
	    }
	};

	MinimaxProblemDisplay.prototype.resize = function() {
	    var currentWidth, desiredWidth, scaleFactor, widthFactor;
	    desiredWidth = this.container.innerWidth() * .975;
	    currentWidth = this.paper.width;
	    widthFactor = desiredWidth / currentWidth;
	    scaleFactor = widthFactor;
	    return this.paper.scaleAll(scaleFactor);
	};

	MinimaxProblemDisplay.prototype.createSubmission = function() {
	    var id, value, _ref, _results;
	    this.newSubmission = {};
	    if (this.submission != null) {
		_ref = this.submission;
		_results = [];
		for (id in _ref) {
		    value = _ref[id];
		    _results.push(this.newSubmission[id] = value);
		}
		return _results;
	    }
	};

	MinimaxProblemDisplay.prototype.draw = function() {
	    var child, drawer, _i, _j, _len, _len1, _ref, _ref1, _results;
	    _ref = this.drawers;
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		drawer = _ref[_i];
		drawer.draw();
	    }
	    _ref1 = this.nodeDrawers;
	    _results = [];
	    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
		drawer = _ref1[_j];
		_results.push((function() {
			    var _k, _len2, _ref2, _results1;
			    _ref2 = drawer.node.children;
			    _results1 = [];
			    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
				child = _ref2[_k];
				_results1.push(drawer.connectTo(child.drawer));
			    }
			    return _results1;
			})());
	    }
	    return _results;
	};

	MinimaxProblemDisplay.prototype.convertValue = function(value) {
	    if (value === 'i' || value === '-I') {
		return Number.POSITIVE_INFINITY;
	    }
	    if (value === '-i' || value === '-I') {
		return Number.NEGATIVE_INFINITY;
	    }
	    return value;
	};

	MinimaxProblemDisplay.prototype.createDrawers = function() {
	    var child, drawer, index, newopts, node, opts, optsQueue, queue, value, _i, _len, _ref;
	    this.drawers = [];
	    this.nodeDrawers = [];
	    queue = [this.rootNode];
	    opts = {
		x: this.MIN_PAPER_WIDTH / 2,
		y: this.PADDING,
		leftBound: this.PADDING,
		rightBound: this.MIN_PAPER_WIDTH - this.PADDING,
		width: this.NODE_WIDTH,
		height: this.NODE_HEIGHT,
		editable: this.editable,
		verticalSpacingFactor: this.verticalSpacingFactor
	    };
	    optsQueue = [opts];
	    while (queue.length !== 0) {
		node = queue.pop();
		opts = optsQueue.pop();
		switch (node.constructor.name) {
		case "MaxNode":
		    value = this.convertValue(this.newSubmission[node.id]);
		    drawer = new MaxNodeDrawer(this.paper, node, this, value, opts);
		    break;
		case "MinNode":
		    value = this.convertValue(this.newSubmission[node.id]);
		    drawer = new MinNodeDrawer(this.paper, node, this, value, opts);
		    break;
		case "ChanceNode":
		    value = this.convertValue(this.newSubmission[node.id]);
		    drawer = new ChanceNodeDrawer(this.paper, node, this, value, opts);
		    break;
		case "ValueNode":
		    value = node.value;
		    drawer = new ValueNodeDrawer(this.paper, node, this, value, opts);
		    break;
		case "NonZeroSumFirstPlayerNode":
		    value = this.newSubmission[node.id];
		    drawer = new NonZeroSumFirstPlayerNodeDrawer(this.paper, node, this, value, opts);
		    break;
		case "NonZeroSumSecondPlayerNode":
		    value = this.newSubmission[node.id];
		    drawer = new NonZeroSumSecondPlayerNodeDrawer(this.paper, node, this, value, opts);
		    break;
		case "NonZeroSumValueNode":
		    value = node.value;
		    drawer = new NonZeroSumValueNodeDrawer(this.paper, node, this, value, opts);
		}
		this.drawers.push(drawer);
		this.nodeDrawers.push(drawer);
		node.drawer = drawer;
		_ref = node.children;
		for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
		    child = _ref[index];
		    newopts = drawer.getChildOpts(index, node.children.length);
		    optsQueue.push(newopts);
		    queue.push(child);
		}
	    }
	    if (this.alphabeta) {
		return this.createAlphaBetaDrawers();
	    }
	};

	MinimaxProblemDisplay.prototype.createAlphaBetaDrawers = function(other) {
	    var alpha, alphaDrawer, alphaLocation, alphaOpts, angle, beta, betaDrawer, betaLocation, betaOpts, bottomAnchor, child, node, queue, topAnchor, _results;
	    queue = [this.rootNode];
	    _results = [];
	    while (queue.length !== 0) {
		node = queue.pop();
		_results.push((function() {
			    var _i, _len, _ref, _results1;
			    _ref = node.children;
			    _results1 = [];
			    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				child = _ref[_i];
				bottomAnchor = node.drawer.bottomAnchor;
				topAnchor = child.drawer.topAnchor;
				angle = bottomAnchor.angleTo(topAnchor);
				if (angle < 270) {
				    alphaLocation = bottomAnchor.pointAtPercent(topAnchor, .35);
				    betaLocation = bottomAnchor.pointAtPercent(topAnchor, .75);
				    alphaLocation.x -= 25 * Math.sin(angle * Math.PI / 180);
				    alphaLocation.y += 25 * Math.cos(angle * Math.PI / 180);
				    betaLocation.x -= 25 * Math.sin(angle * Math.PI / 180);
				    betaLocation.y += 25 * Math.cos(angle * Math.PI / 180);
				} else {
				    alphaLocation = bottomAnchor.pointAtPercent(topAnchor, .75);
				    betaLocation = bottomAnchor.pointAtPercent(topAnchor, .35);
				    alphaLocation.x += 25 * Math.sin(angle * Math.PI / 180);
				    alphaLocation.y -= 25 * Math.cos(angle * Math.PI / 180);
				    betaLocation.x += 25 * Math.sin(angle * Math.PI / 180);
				    betaLocation.y -= 25 * Math.cos(angle * Math.PI / 180);
				}
				alphaOpts = {
				    editable: this.editable,
				    idSuffix: '_alpha',
				    textPrefix: "α:",
				    angle: angle,
				    location: alphaLocation
				};
				betaOpts = {
				    editable: this.editable,
				    idSuffix: '_beta',
				    textPrefix: "β:",
				    angle: angle,
				    location: betaLocation
				};
				alpha = this.convertValue(this.newSubmission[child.id + '_alpha']);
				beta = this.convertValue(this.newSubmission[child.id + '_beta']);
				alphaDrawer = new TextNodeDrawer(this.paper, child, this, alpha, alphaOpts);
				betaDrawer = new TextNodeDrawer(this.paper, child, this, beta, betaOpts);
				child.alphaDrawer = alphaDrawer;
				child.betaDrawer = betaDrawer;
				this.drawers.push(alphaDrawer);
				this.drawers.push(betaDrawer);
				_results1.push(queue.push(child));
			    }
			    return _results1;
			}).call(this));
	    }
	    return _results;
	};

	MinimaxProblemDisplay.prototype.partStatus = function(id, value) {
	    if (this.showResult || !this.liveFeedback) {
		if ((this.evaluation == null) || (this.evaluation[id] == null)) {
		    return "unknown";
		} else {
		    if (this.evaluation[id]) {
			return "correct";
		    } else {
			return "incorrect";
		    }
		}
	    } else {
		if ((this.newSubmission == null) || (this.newSubmission[id] == null)) {
		    return "unknown";
		} else {
		    if (this.liveFeedbackValues[id] === this.newSubmission[id]) {
			return "correct";
		    } else {
			return "incorrect";
		    }
		}
	    }
	};

	MinimaxProblemDisplay.prototype.updateValue = function(id, value) {
	    if (value === Number.NEGATIVE_INFINITY) {
		value = "-i";
	    }
	    if (value === Number.POSITIVE_INFINITY) {
		value = "i";
	    }
	    this.newSubmission[id] = value;
	    return this.updateSubmission();
	};

	MinimaxProblemDisplay.prototype.getValue = function(id) {
	    return this.newSubmission[id];
	};

	MinimaxProblemDisplay.prototype.getCurrentSubmission = function() {
	    return this.newSubmission;
	};

	MinimaxProblemDisplay.prototype.showAnswer = function(answer) {
	    var drawer, id, value, _i, _len, _ref, _results;
	    this.evaluation = {};
	    for (id in answer) {
		value = answer[id];
		this.evaluation[id] = true;
		this.submission = answer;
		this.updateValue(id, value);
	    }
	    _ref = this.drawers;
	    _results = [];
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		drawer = _ref[_i];
		if (drawer.constructor.name !== "ValueNodeDrawer") {
		    drawer.setUneditable();
		    _results.push(drawer.loadValue());
		} else {
		    _results.push(void 0);
		}
	    }
	    return _results;
	};

	MinimaxProblemDisplay.prototype.hideAnswer = function() {
	    var drawer, id, value, _i, _len, _ref, _ref1, _results;
	    _ref = this.newSubmission;
	    for (id in _ref) {
		value = _ref[id];
		this.evaluation = null;
		this.submission = null;
		this.updateValue(id, "");
	    }
	    _ref1 = this.drawers;
	    _results = [];
	    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
		drawer = _ref1[_i];
		if (drawer.constructor.name !== "ValueNodeDrawer" && drawer.constructor.name !== "NonZeroSumValueNodeDrawer") {
		    drawer.setEditable();
		    _results.push(drawer.loadValue());
		} else {
		    _results.push(void 0);
		}
	    }
	    return _results;
	};

	return MinimaxProblemDisplay;

    })(XProblemDisplay);

NodeDrawer = (function() {
	function NodeDrawer(paper, node, display, storedValue, opts) {
	    var _ref;
	    this.paper = paper;
	    this.node = node;
	    this.display = display;
	    this.storedValue = storedValue != null ? storedValue : null;
	    this.unHighlight = __bind(this.unHighlight, this);
	    this.highlight = __bind(this.highlight, this);
	    this.editValue = __bind(this.editValue, this);
	    this.x = opts.x;
	    this.y = opts.y;
	    this.leftBound = opts.leftBound;
	    this.rightBound = opts.rightBound;
	    this.width = opts.width;
	    this.height = opts.height;
	    this.verticalSpacingFactor = opts.verticalSpacingFactor;
	    this.editable = (_ref = opts.editable) != null ? _ref : false;
	    this.green = '#0f0';
	    this.red = '#f00';
	    this.blue = '#00f';
	    this.yellow = '#d4c84a';
	    this.white = '#fff';
	    this.active = false;
	}

	NodeDrawer.prototype.nodeId = function() {
	    return this.node.id;
	};

	NodeDrawer.prototype.draw = function() {
	    this.makeDrawing();
	    this.validate();
	    this.setCallbacks();
	    return this.drawValue();
	};

	NodeDrawer.prototype.setCallbacks = function() {
	    if (this.editable) {
		$(this.drawing.node).mouseover(this.highlight);
		$(this.drawing.node).mouseout(this.unHighlight);
		$(this.drawing.node).click(this.editValue);
		if (this.text != null) {
		    return $(this.text.node).click(this.editValue);
		}
	    } else {
		$(this.drawing.node).unbind("mouseover mouseout click");
		if (this.text != null) {
		    return $(this.text.node).unbind("click");
		}
	    }
	};

	NodeDrawer.prototype.setUneditable = function() {
	    this.editable = false;
	    return this.setCallbacks();
	};

	NodeDrawer.prototype.setEditable = function() {
	    this.editable = true;
	    return this.setCallbacks();
	};

	NodeDrawer.prototype.loadValue = function() {
	    this.updateValue(this.display.getValue(this.nodeId()));
	    return this.drawValue();
	};

	NodeDrawer.prototype.stringifyValue = function() {
	    var _ref;
	    if (this.storedValue == null) {
		return "";
	    }
	    if (this.storedValue === Number.NEGATIVE_INFINITY) {
		return "-i";
	    }
	    if (this.storedValue === Number.POSITIVE_INFINITY) {
		return "i";
	    }
	    return (_ref = this.storedValue.toString()) != null ? _ref : "";
	};

	NodeDrawer.prototype.editValue = function(event) {
	    var currentValue,
	    _this = this;
	    this.active = true;
	    this.removeValue();
	    this.highlight();
	    this.display.inputField.show();
	    currentValue = this.stringifyValue();
	    this.display.inputField.val(currentValue);
	    this.display.inputField.focus();
	    return this.display.inputField.blur(function(event) {
		    _this.active = false;
		    _this.display.inputField.unbind("blur");
		    _this.display.inputField.hide();
		    _this.updateValue(_this.display.inputField.val());
		    return _this.drawValue();
		});
	};

	NodeDrawer.prototype.updateValue = function(newValue) {
	    switch (newValue) {
	    case "":
	    this.storedValue = null;
	    break;
	    case "-i":
	    case "-I":
	    this.storedValue = Number.NEGATIVE_INFINITY;
	    break;
	    case "i":
	    case "I":
	    this.storedValue = Number.POSITIVE_INFINITY;
	    break;
	    case "x":
	    case "X":
	    this.storedValue = "x";
	    break;
	    default:
	    if (this.display.ordering && (newValue === "l" || newValue === "L")) {
		this.storedValue = "L";
	    } else if (this.display.ordering && (newValue === "r" || newValue === "R")) {
		this.storedValue = "R";
	    } else if (this.display.ordering && (newValue === "E")) {
		this.storedValue = "R";
	    } else {
		this.storedValue = parseInt(newValue);
		if (isNaN(this.storedValue)) {
		    this.storedValue = null;
		}
	    }
	    }
	    this.display.updateValue(this.nodeId(), this.storedValue);
	    return this.validate();
	};

	NodeDrawer.prototype.validate = function() {
	    this.validateValue();
	    return this.updateValueBoxColor();
	};

	NodeDrawer.prototype.validateValue = function() {
	    return this.status = this.display.partStatus(this.nodeId(), this.storedValue);
	};

	NodeDrawer.prototype.highlight = function(event) {
	    return this.drawing.attr({
		    stroke: this.yellow,
		    'stroke-width': 4
		});
	};

	NodeDrawer.prototype.unHighlight = function(event) {
	    if (!this.active) {
		return this.updateValueBoxColor();
	    }
	};

	NodeDrawer.prototype.updateValueBoxColor = function() {
	    if (this.display.ordering) {
		return this.drawing.attr({
			fill: this.white,
			stroke: this.blue,
			'stroke-width': 3
		    });
	    } else {
		switch (this.status) {
		case "unknown":
		return this.drawing.attr({
			fill: this.white,
			stroke: this.blue,
			'stroke-width': 3
		    });
		case "correct":
		return this.drawing.attr({
			stroke: '#0f0',
			    fill: '#fff',
			    'stroke-width': 4
			    });
		case "incorrect":
		return this.drawing.attr({
			stroke: '#f00',
			    fill: '#fee',
			    'stroke-width': 4
			    });
		}
	    }
	};

	NodeDrawer.prototype.connectTo = function(other) {
	    return other.parentConnection = this.bottomAnchor.lineTo(other.topAnchor);
	};

	NodeDrawer.prototype.getBordersForChild = function(childNumber, numChildren) {
	    var maxVal, minVal, strideX;
	    strideX = (this.rightBound - this.leftBound) / numChildren;
	    minVal = this.leftBound + strideX * childNumber;
	    maxVal = minVal + strideX;
	    return [minVal, maxVal];
	};

	NodeDrawer.prototype.getChildOpts = function(childNumber, numChildren) {
	    var leftBound, opts, rightBound, _ref;
	    _ref = this.getBordersForChild(childNumber, numChildren), leftBound = _ref[0], rightBound = _ref[1];
	    opts = {
		editable: this.editable,
		paper: this.paper,
		x: (leftBound + rightBound) / 2,
		y: this.y + this.height * this.verticalSpacingFactor,
		leftBound: leftBound,
		rightBound: rightBound,
		height: this.height,
		width: this.width,
		verticalSpacingFactor: this.verticalSpacingFactor
	    };
	    return opts;
	};

	NodeDrawer.prototype.removeValue = function() {
	    if (this.text != null) {
		$(this.text.node).remove();
		return delete this.text;
	    }
	};

	NodeDrawer.prototype.drawValue = function() {
	    var font, text;
	    if (this.text != null) {
		$(this.text.node).unbind();
		$(this.text.node).remove();
		delete this.text;
	    }
	    if (this.storedValue != null) {
		text = this.storedValue;
		font = "Trebuchet MS";
		if (text === Number.POSITIVE_INFINITY) {
		    text = "∞";
		    font = "sans-serif";
		} else if (text === Number.NEGATIVE_INFINITY) {
		    text = "-∞";
		    font = "sans-serif";
		}
		this.text = this.paper.text(this.x, this.y, text);
		this.text.attr({
			'font-size': 24,
			    'font-family': font
			    });
		if (this.editable) {
		    return $(this.text.node).click(this.editValue);
		}
	    }
	};

	return NodeDrawer;

    })();

QuadrilateralNodeDrawer = (function(_super) {
	__extends(QuadrilateralNodeDrawer, _super);

	function QuadrilateralNodeDrawer(paper, node, display, storedValue, opts) {
	    this.paper = paper;
	    this.node = node;
	    this.display = display;
	    this.storedValue = storedValue != null ? storedValue : null;
	    QuadrilateralNodeDrawer.__super__.constructor.call(this, this.paper, this.node, this.display, this.storedValue, opts);
	    this.minX = this.x - this.width / 2;
	    this.minY = this.y - this.height / 2;
	    this.maxX = this.x + this.width / 2;
	    this.maxY = this.y + this.height / 2;
	    this.topAnchor = new Point(this.paper, (this.minX + this.maxX) / 2, this.minY);
	    this.bottomAnchor = new Point(this.paper, (this.minX + this.maxX) / 2, this.maxY);
	}

	QuadrilateralNodeDrawer.prototype.makeDrawing = function() {
	    return this.drawing = this.paper.path("M " + this.topLeft.x + "     " + this.topLeft.y + "                            L" + this.topRight.x + "     " + this.topRight.y + "                            L" + this.bottomRight.x + "  " + this.bottomRight.y + "                            L" + this.bottomLeft.x +is.topLeft.y);
	};

	return QuadrilateralNodeDrawer;

    })(NodeDrawer);

TextNodeDrawer = (function(_super) {
	__extends(TextNodeDrawer, _super);

	function TextNodeDrawer(paper, node, display, storedValue, opts) {
	    var _ref;
	    this.paper = paper;
	    this.node = node;
	    this.display = display;
	    this.storedValue = storedValue != null ? storedValue : null;
	    this.editValue = __bind(this.editValue, this);
	    this.highlight = __bind(this.highlight, this);
	    this.unHighlight = __bind(this.unHighlight, this);
	    this.location = opts.location;
	    this.angle = opts.angle;
	    this.idSuffix = opts.idSuffix;
	    this.textPrefix = opt function(event) {
		if (!this.active) {
		    return this.updateValueBoxColor();
		}
	    };

	    TextNodeDrawer.prototype.makeDrawing = function(text) {
		if (text == null) {
		    text = "";
		}
		if (text === Number.POSITIVE_INFINITY) {
		    text = "∞";
		} else if (text === Number.NEGATIVE_INFINITY) {
		    text = "-∞";
		}
		this.drawing = this.location.drawText(this.textPrefix + " " + text, {
			fontSize: 20,
			angle: this.angle,
			outlineColor: '#00f'
		    });
		if (text === "") {
		    return this.drawing.updateBox(10);
		}
	    };

	    TextNodeDrawer.prototype.highlight = function(event) {
		return this.drawing.updateBoxColor(this.yellow);
	    };

	    TextNodeDrawer.prototype.setCallbacks = function() {
		TextNodeDrawer.__super_ return $(this.drawing.rect.node).unbind("mouseover mouseout click");
	    }
	};

	TextNodeDrawer.prototype.editValue = function(event) {
	    return TextNodeDrawer.__super__.editValue.call(this, event);
	};

	TextNodeDrawer.prototype.updateValueBoxColor = function() {
	    switch (this.status) {
	    case "unknown":
	    this.drawing.updateBoxColor(this.blue);
	    return this.drawing.updateBoxFill(this.white);
	    case "correct":
	    this.drawing.updateBoxColor(this.green);
	    return this.drawing.updateBoxFill(this.white);
      case "inc);
    delete this.drawing;
    this.makeDrawing(this.storedValue);
    this.setCallbacks();
    return this.updateValueBoxColor();
  };

  return TextNodeDrawer;

})(NodeDrawer);

CirclularNodeDrawer = (function(_super) {
  __extends(CirclularNodeDrawer, _super);

  function CirclularNodeDrawer(paper, node, display, storedValue, opts) {
    this.paper = paper;
    this.node = node;
    this.display = display;
    this.storedValue = storedValue != null ? storedValue : null;
    CirclularNodeDrawer.__super__.constructor.call(this, this.paper, this.node, this.display, this.storedValue, opts);
    this.radius = (this.width + this.height) / 4;
    this.topAnchor = new Point(this.paper, this.x, this.y - this.radius);
    this.bottomAnchor = new Point(this.paper, this.x, this.y + this.radius);
  }

  Circl {
  __extends(MaxNodeDrawer, _super);

  function MaxNodeDrawer(paper, node, display, storedValue, opts) {
    var scaleFactor;
    this.paper = paper;
    this.node = node;
    this.display = display;
    this.storedValue = storedValue != null ? storedValue : null;
    MaxNodeDrawer.__super__.constructor.call(this, this.paper, this.node, this.display, this.storedValue, opts);
    scaleFactor = 0.618;
    this.topLeft = new Point(this.paper, this.minX + this.width .display = display;
    this.storedValue = storedValue != null ? storedValue : null;
    MinNodeDrawer.__super__.constructor.call(this, this.paper, this.node, this.display, this.storedValue, opts);
    scaleFactor = 0.618;
    this.topLeft = new Point(this.paper, this.minX, this.minY);
    this.topRight = new Point(this.paper, this.maxX, this.minY);
    this.bottomLeft = new Point(this.paper, this.minX + this.width * ((1 - scaleFactor) / 2), this.maxY);
    this.bottomRight = new Point(this.paper, this.maxX - this.width * ((1 - scaleFactor) / 2), this.maxY);
  }

  return MinNodeDrawer;

})(QuadrilateralNodeDrawer);

ValueNodeDrawer = (function(_super) {
  __extends(ValueNodeDrawer, _super);

  function ValueNodeDrawer(paper, node, display, storedValue, opts) {
    this.paper = paper;
    this.node = node;
    this.display = display;
    this.storedValue = storedValue != null ? storedValue : null;
    ValueNodeDrawer.__super__.constr;
    this.editable = false;
    this.bottomLeft = new Point(this.paper, this.maxX, this.minY);
    this.bottomRight = new Point(this.paper, this.maxX, this.maxY);
    this.topLeft = new Point(this.paper, this.minX, this.minY);
    this.topRight = new Point(this.paper, this.minX, this.maxY);
  }

  ValueNodeDrawer.prototype.setCallbacks = function() {};

  ValueNodeDrawer.prototype.validateValue = function() {};

  ValueNodeDrawer.prototype.updateValueBoxColor = function() {
    return this.drawing.attr({
      stroke: "#fff"
    });
  };

  return ValueNodeDrawer;

})(QuadrilateralNodeDrawer);

ChanceNodeDrawer = (function(_super) {
  __extends(ChanceNodeDrawer, _super);

  function ChanceNodeDrawer() {
    _ref = ChanceNodeDrawer.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return ChanceNodeDrawer;

})(CirclularNodeDrawer);

NonZeroSumNodeDrawer = (function(_super) {
  __extends(NonZeroSumNodeDrawer, _super);

  function NonZe{
    this.paper = paper;
    this.node = node;
    this.display = display;
    this.storedValue = storedValue != null ? storedValue : null;
    this.sendValue = __bind(this.sendValue, this);
    NonZeroSumNodeDrawer.__super__.constructor.call(this, this.paper, this.node, this.display, this.storedValue, opts);
    this.minX = this.x - this.width / 2;
    this.minY = this.y - this.height / 2;
    this.maxX = this.x + this.width / 2;
    this.maxY = this.y + this.height / 2;
    this.topAnchor = new Point(this.paper, (this.minX + this.maxX) / 2, this.minY);
    this.bottomAnchor = new Point(this.paper, (this.minX + this.maxX) / 2, this.maxY);
  }

  NonZeroSumNodeDrawer.prototype.makeDrawing = function() {
    return this.drawing = this.paper.path("M"   " + this.bottomLeft.y + "                            L" + this.topLeft.x + "      " + this.topLeft.y);
	};

	NonZeroSumNodeDrawer.prototype.sendValue = function() {
	    if (this.node.parent != null) {
		this.node.parent.drawer.updateValue(this.storedValue);
		return this.node.parent.drawer.drawValue();
	    }
	};

	NonZeroSumNodeDrawer.prototype.drawValue = function() {
	    if (this.text != null) {
		$(this.text.node).remove();
		delete this.text;
	    }
	    if ((this.storedValue != null) && this.storedValue !== "") {
		this.text = this.paper.text(this.x, this.y, "(" + this.storedValue[0] + ", " + this.storedValue[1] + ")");
		this.text.attr({
			'font-size': 16,
			    'font-family': 'Trebuchet MS'
			    });
		return this.setCallbacks();
	    }
	};

	NonZeroSumNodeDrawer.prototype.unbind = function() {
	    $(this.drawing.node).unbind();
	    if (this.text != null) {
		return $(this.text.node).unbind();
	    }
	};

	NonZeroSumNodeDrawer.prototype.setCallbacks = function() {
	    this.unbind();
	    if (this.editable) {
		$(this.drawing.node).mouseover(this.highlight);
		$(this.drawing.node).mouseout(this.unHighlight);
		$(this.drawing.node).click(this.sendValue);
		if (this.text != null) {
		    $(this.text.node).click(this.sendValue);
		    $(this.text.node).mouseover(this.highlight);
		    return $(this.text.node).mouseout(this.unHighlight);
		}
	    }
	};

	NonZeroSumNodeDrawer.prototype.updateValue = function(newValue) {
	    this.storedValue = newValue;
	    this.display.updateValue(this.nodeId(), this.storedValue);
	    return this.validate();
	};

	return NonZeroSumNodeDrawer;

    })(NodeDrawer);

NonZeroSumSecondPlayerNodeDrawer = (function(_super) {
	__extends(NonZeroSumSecondPlayerNodeDrawer, _super);

	function NonZeroSumSecondPlayerNodeDrawer(paper, node, display, storedValue, opts) {
	    var scaleFactor;
	    this.paper = paper;
	    this.node = node;
	    this.display = display;
	    this.storedValue = storedValue != null ? storedValue : null;
	    NonZeroSumSecondPlayerNodeDrawer.__super__.constructor.call(this, this.paper, this.node, this.display, this.storedValue, opts);
	    scaleFactor = 0.9;
	    this.topLeft = new Point(this.paper, this.minX, this.minY);
	    this.topRight = new Point(this.paper, this.maxX - this.width * (1 - scaleFactor), this.minY);
	    this.bottomLeft = new Point(this.paper, this.minX, this.maxY);
	    this.bottomRight = new Point(this.paper, this.maxX - this.width * (1 - scaleFactor), this.maxY);
	    this.corner = new Point(this.paper, this.maxX, (this.minY + this.maxY) / 2);
	}

	NonZeroSumSecondPlayerNodeDrawer.prototype.makeDrawing = function() {
	    return this.drawing = this.paper.path("M " + this.topLeft.x + "     " + this.topLeft.y + "                            L" + this.topRight.x + "     " + this.topRight.y + "                            L" + this.corner.x + "       " + this.corner.y + "                            L" + this.bottomRight.x + "  " + this.bottomRight.y + "                            L" + this.bottomLeft.x + "   " + this.bottomLeft.y + "                            L" + this.topLeft.x + "      " + this.topLeft.y);
	};

	return NonZeroSumSecondPlayerNodeDrawer;

    })(NonZeroSumNodeDrawer);

NonZeroSumFirstPlayerNodeDrawer = (function(_super) {
	__extends(NonZeroSumFirstPlayerNodeDrawer, _super);

	function NonZeroSumFirstPlayerNodeDrawer(paper, node, display, storedValue, opts) {
	    var scaleFactor;
	    this.paper = paper;
	    this.node = node;
	    this.display = display;
	    this.storedValue = storedValue != null ? storedValue : null;
	    NonZeroSumFirstPlayerNodeDrawer.__super__.constructor.call(this, this.paper, this.node, this.display, this.storedValue, opts);
	    scaleFactor = 0.9;
	    this.topLeft = new Point(this.paper, this.minX + this.width * (1 - scaleFactor), this.minY);
	    this.topRight = new Point(this.paper, this.maxX, this.minY);
	    this.bottomLeft = new Point(this.paper, this.minX + this.width * (1 - scaleFactor), this.maxY);
	    this.bottomRight = new Point(this.paper, this.maxX, this.maxY);
	    this.corner = new Point(this.paper, this.minX, (this.minY + this.maxY) / 2);
	}

	NonZeroSumFirstPlayerNodeDrawer.prototype.makeDrawing = function() {
	    return this.drawing = this.paper.path("M " + this.topLeft.x + "     " + this.topLeft.y + "                            L" + this.topRight.x + "     " + this.topRight.y + "                            L" + this.bottomRight.x + "  " + this.bottomRight.y + "                            L" + this.bottomLeft.x + "   " + this.bottomLeft.y + "                            L" + this.corner.x + "       " + this.corner.y + "                            L" + this.topLeft.x + "      " + this.topLeft.y);
	};

	return NonZeroSumFirstPlayerNodeDrawer;

    })(NonZeroSumNodeDrawer);

NonZeroSumValueNodeDrawer = (function(_super) {
	__extends(NonZeroSumValueNodeDrawer, _super);

	function NonZeroSumValueNodeDrawer(paper, node, display, storedValue, opts) {
	    this.paper = paper;
	    this.node = node;
	    this.display = display;
	    this.storedValue = storedValue != null ? storedValue : null;
	    NonZeroSumValueNodeDrawer.__super__.constructor.call(this, this.paper, this.node, this.display, this.storedValue, opts);
	    this.topLeft = new Point(this.paper, this.minX, this.minY);
	    this.topRight = new Point(this.paper, this.maxX, this.minY);
	    this.bottomLeft = new Point(this.paper, this.minX, this.maxY);
	    this.bottomRight = new Point(this.paper, this.maxX, this.maxY);
	}

	NonZeroSumValueNodeDrawer.prototype.updateValueBoxColor = function() {
	    return this.drawing.attr({
		    fill: this.white,
		    stroke: "#000",
		    'stroke-width': 3
		});
	};

	return NonZeroSumValueNodeDrawer;

    })(NonZeroSumNodeDrawer);

Point = (function() {
	function Point(paper, x, y) {
	    this.paper = paper;
	    this.x = x;
	    this.y = y;
	}

	Point.prototype.lineTo = function(other, strokeWidth) {
	    var line;
	    if (strokeWidth == null) {
		strokeWidth = 2;
	    }
	    line = this.paper.path("M " + this.x + " " + this.y + "L" + other.x + " " + other.y);
	    line.attr({
		    stroke: '#000',
			'stroke-width': strokeWidth
			});
	    return line;
	};

	Point.prototype.angleTo = function(other) {
	    return Raphael.angle(this.x, this.y, other.x, other.y);
	};

	Point.prototype.midpointTo = function(other) {
	    return new Point(this.paper, (this.x + other.x) / 2, (this.y + other.y) / 2);
	};

	Point.prototype.pointAtPercent = function(other, percent) {
	    return new Point(this.paper, this.x * (1 - percent) + other.x * percent, this.y * (1 - percent) + other.y * percent);
	};

	Point.prototype.drawText = function(text, opts) {
	    var backgroundColor, color, fontSize, height, outlineColor, outlineWidth, rect, _ref1, _ref2, _ref3, _ref4, _ref5,
	    _this = this;
	    if (opts == null) {
		opts = {};
	    }
	    if (text === Number.POSITIVE_INFINITY) {
		text = "∞";
	    } else if (text === Number.NEGATIVE_INFINITY) {
		text = "-∞";
	    }
	    fontSize = (_ref1 = opts.fontSize) != null ? _ref1 : 20;
	    color = (_ref2 = opts.color) != null ? _ref2 : "#000";
	    backgroundColor = (_ref3 = opts.backgroundColor) != null ? _ref3 : "#fff";
	    outlineColor = (_ref4 = opts.outlineColor) != null ? _ref4 : '#fff';
	    outlineWidth = (_ref5 = opts.outlineWidth) != null ? _ref5 : 2;
	    text = this.paper.text(this.x, this.y, text);
	    text.attr({
		    'font-size': fontSize,
			'font-family': 'sans-serif',
			fill: color
			});
	    height = 1.15 * (text.getBBox().height);
	    rect = this.paper.rect(this.x - text.getBBox().width / 2, this.y - height / 2, text.getBBox().width * 1.1, height).attr({
		    fill: backgroundColor,
		    stroke: outlineColor,
		    'stroke-width': outlineWidth
		});
	    text.rect = rect;
	    text.updateBox = function(padding) {
		if (padding == null) {
		    padding = 5;
		}
		height = 1.15 * (text.getBBox(true).height);
		return text.rect.attr({
			x: _this.x - text.getBBox(true).width / 2,
			    y: _this.y - height / 2,
			    width: text.getBBox(true).width * 1.1 + padding,
			    height: height
			    });
	    };
	    text.updateBoxColor = function(color) {
		return text.rect.attr({
			stroke: color
		    });
	    };
	    text.updateBoxFill = function(color) {
		return text.rect.attr({
			fill: color
		    });
	    };
	    if (opts.angle != null) {
		if (opts.angle < 270) {
		    opts.angle += 180;
		}
		text.rotate(opts.angle);
		text.rotation = opts.angle;
		rect.rotate(opts.angle);
	    }
	    text.toFront();
	    return text;
	};

	return Point;

    })();

root = typeof exports !== "undefined" && exports !== null ? exports : this;

root.MinimaxProblemDisplay = MinimaxProblemDisplay;