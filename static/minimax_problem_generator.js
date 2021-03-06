var MinimaxProblemGenerator, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

MinimaxProblemGenerator = (function(_super) {
	__extends(MinimaxProblemGenerator, _super);

	function MinimaxProblemGenerator(seed, parameters) {
	    this.parameters = parameters != null ? parameters : {};
	    MinimaxProblemGenerator.__super__.constructor.call(this, seed, this.parameters);
	    this.numActionsPerLevel = this.parameters.numActionsPerLevel;
	    this.numLeaves = this.numActionsPerLevel.reduce(function(a, b) {
		    return a * b;
		});
	    this.alphabeta = this.parameters.problemType === 'alphabeta';
	    this.expectimax = this.parameters.problemType === 'expectimax';
	    this.nonzerosum = this.parameters.problemType === 'nonzerosum';
	    this.chosenValues = [];
	}

	MinimaxProblemGenerator.prototype.generate = function() {
	    var i, j, value, _i, _j, _ref;
	    this.problemState.leafValues = [];
	    for (i = _i = 0, _ref = this.numLeaves; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
		if (this.nonzerosum) {
		    value = [];
		    for (j = _j = 0; _j <= 1; j = ++_j) {
			value.push(this.randomValue());
		    }
		    this.problemState.leafValues[i] = value;
		} else {
		    this.problemState.leafValues[i] = this.randomValue();
		}
	    }
	    this.problemState.leafValues = this.shuffleArray(this.problemState.leafValues);
	    if (this.parameters.final) {
		this.problemState.leafValues = [3, 6, 2, 3, 7, 1, 2, 0];
	    }
	    if (this.parameters.problemType === 'ordering') {
		this.problemState.leafValues = [2, 8, 4, 5, 3, 7, -1, 1];
	    }
	    return this.problemState;
	};

	MinimaxProblemGenerator.prototype.shuffleArray = function(array) {
	    var current, tmp, top;
	    array = array.slice(0);
	    tmp = array.length;
	    current = array.length;
	    top = array.length;
	    if (top) {
		while (--top) {
		    current = Math.floor(this.random.random() * (top + 1));
		    tmp = array[current];
		    array[current] = array[top];
		    array[top] = tmp;
		}
	    }
	    return array;
	};

	MinimaxProblemGenerator.prototype.randomValue = function(range) {
	    var attempts, divisor, newValue;
	    if (range == null) {
		range = 10;
	    }
	    attempts = 0;
	    while ((newValue == null) || __indexOf.call(this.chosenValues, newValue) >= 0) {
		newValue = Math.floor(this.random.random() * range);
		if (this.expectimax) {
		    divisor = this.numActionsPerLevel[this.numActionsPerLevel.length - 1];
		    newValue = (Math.floor((newValue + divisor - 1) / divisor)) * divisor;
		}
		attempts += 1;
		if (attempts === 30) {
		    range += 10;
		    attempts = 0;
		}
	    }
	    this.chosenValues.push(newValue);
	    return newValue;
	};

	return MinimaxProblemGenerator;

    })(XProblemGenerator);

root = typeof exports !== "undefined" && exports !== null ? exports : this;

root.generatorClass = MinimaxProblemGenerator;