var ChanceNode, MaxNode, MinNode, MinimaxNode, MinimaxProblem, NonZeroSumFirstPlayerNode, NonZeroSumNode, NonZeroSumProblem, NonZeroSumSecondPlayerNode, NonZeroSumValueNode, ValueNode, root, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MinimaxNode = (function() {
	function MinimaxNode(id, value) {
	    this.id = id;
	    this.value = value != null ? value : null;
	    this.children = [];
	}

	MinimaxNode.prototype.getValue = function() {
	    var child;
	    if (this.value == null) {
		this.value = ((function() {
			    var _i, _len, _ref, _results;
			    _ref = this.children;
			    _results = [];
			    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				child = _ref[_i];
				_results.push(child.getValue());
			    }
			    return _results;
			}).call(this)).reduce(this.reduceFunction);
	    }
	    return this.value;
	};

	return MinimaxNode;

    })();

MaxNode = (function(_super) {
	__extends(MaxNode, _super);

	function MaxNode() {
	    _ref = MaxNode.__super__.constructor.apply(this, arguments);
	    return _ref;
	}

	MaxNode.prototype.reduceFunction = function(a, b) {
	    return Math.max(a, b);
	};

	MaxNode.prototype.createChild = function(id, expectimax) {
	    return new MinNode(id);
	};

	MaxNode.prototype.getValueAlphaBeta = function(alpha, beta) {
	    var child, v, _i, _len, _ref1;
	    this.alpha = alpha;
	    this.beta = beta;
	    v = Number.NEGATIVE_INFINITY;
	    if (this.value == null) {
		_ref1 = this.children;
		for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
		    child = _ref1[_i];
		    v = Math.max(v, child.getValueAlphaBeta(alpha, beta));
		    if (v >= beta) {
			this.value = v;
			return this.value;
		    }
		    alpha = Math.max(alpha, v);
		}
		this.value = v;
	    }
	    return this.value;
	};

	return MaxNode;

    })(MinimaxNode);

MinNode = (function(_super) {
	__extends(MinNode, _super);

	function MinNode() {
	    _ref1 = MinNode.__super__.constructor.apply(this, arguments);
	    return _ref1;
	}

	MinNode.prototype.reduceFunction = function(a, b) {
	    return Math.min(a, b);
	};

	MinNode.prototype.createChild = function(id, expectimax) {
	    if (expectimax) {
		return new ChanceNode(id);
	    } else {
		return new MaxNode(id);
	    }
	};

	MinNode.prototype.getValueAlphaBeta = function(alpha, beta) {
	    var child, v, _i, _len, _ref2;
	    this.alpha = alpha;
	    this.beta = beta;
	    v = Number.POSITIVE_INFINITY;
	    if (this.value == null) {
		_ref2 = this.children;
		for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
		    child = _ref2[_i];
		    v = Math.min(v, child.getValueAlphaBeta(alpha, beta));
		    if (v <= alpha) {
			this.value = v;
			return this.value;
		    }
		    beta = Math.min(beta, v);
		}
		this.value = v;
	    }
	    return this.value;
	};

	return MinNode;

    })(MinimaxNode);

ChanceNode = (function(_super) {
	__extends(ChanceNode, _super);

	function ChanceNode() {
	    _ref2 = ChanceNode.__super__.constructor.apply(this, arguments);
	    return _ref2;
	}

	ChanceNode.prototype.getValue = function() {
	    var child, sum;
	    if (this.value == null) {
		sum = ((function() {
			    var _i, _len, _ref3, _results;
			    _ref3 = this.children;
			    _results = [];
			    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
				child = _ref3[_i];
				_results.push(child.getValue());
			    }
			    return _results;
			}).call(this)).reduce(function(s, i) {
				return s += i;
			    });
		this.value = sum / this.children.length;
	    }
	    return this.value;
	};

	ChanceNode.prototype.reduceFunction = function(a, b) {
	    return Math.min(a, b);
	};

	ChanceNode.prototype.createChild = function(id, expectimax) {
	    return new MaxNode(id);
	};

	return ChanceNode;

    })(MinimaxNode);

ValueNode = (function(_super) {
	__extends(ValueNode, _super);

	function ValueNode() {
	    _ref3 = ValueNode.__super__.constructor.apply(this, arguments);
	    return _ref3;
	}

	ValueNode.prototype.getValueAlphaBeta = function(alpha, beta) {
	    this.alpha = alpha;
	    this.beta = beta;
	    return this.value;
	};

	return ValueNode;

    })(MinimaxNode);

NonZeroSumNode = (function() {
	function NonZeroSumNode(id, value) {
	    this.id = id;
	    this.value = value != null ? value : null;
	    this.children = [];
	}

	NonZeroSumNode.prototype.getValue = function() {
	    var child;
	    if (this.value == null) {
		this.value = ((function() {
			    var _i, _len, _ref4, _results;
			    _ref4 = this.children;
			    _results = [];
			    for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
				child = _ref4[_i];
				_results.push(child.getValue());
			    }
			    return _results;
			}).call(this)).reduce(this.reduceFunction);
	    }
	    return this.value;
	};

	return NonZeroSumNode;

    })();

NonZeroSumValueNode = (function(_super) {
	__extends(NonZeroSumValueNode, _super);

	function NonZeroSumValueNode() {
	    _ref4 = NonZeroSumValueNode.__super__.constructor.apply(this, arguments);
	    return _ref4;
	}

	return NonZeroSumValueNode;

    })(NonZeroSumNode);

NonZeroSumFirstPlayerNode = (function(_super) {
	__extends(NonZeroSumFirstPlayerNode, _super);

	function NonZeroSumFirstPlayerNode() {
	    _ref5 = NonZeroSumFirstPlayerNode.__super__.constructor.apply(this, arguments);
	    return _ref5;
	}

	NonZeroSumFirstPlayerNode.prototype.createChild = function(id) {
	    var child;
	    child = new NonZeroSumSecondPlayerNode(id);
	    child.parent = this;
	    return child;
	};

	NonZeroSumFirstPlayerNode.prototype.reduceFunction = function(a, b) {
	    if (a[0] >= b[0]) {
		return a;
	    } else {
		return b;
	    }
	};

	return NonZeroSumFirstPlayerNode;

    })(NonZeroSumNode);

NonZeroSumSecondPlayerNode = (function(_super) {
	__extends(NonZeroSumSecondPlayerNode, _super);

	function NonZeroSumSecondPlayerNode() {
	    _ref6 = NonZeroSumSecondPlayerNode.__super__.constructor.apply(this, arguments);
	    return _ref6;
	}

	NonZeroSumSecondPlayerNode.prototype.reduceFunction = function(a, b) {
	    if (a[1] >= b[1]) {
		return a;
	    } else {
		return b;
	    }
	};

	NonZeroSumSecondPlayerNode.prototype.createChild = function(id) {
	    var child;
	    child = new NonZeroSumFirstPlayerNode(id);
	    child.parent = this;
	    return child;
	};

	return NonZeroSumSecondPlayerNode;

    })(NonZeroSumNode);

MinimaxProblem = (function() {
	function MinimaxProblem(problemState, parameters) {
	    this.problemState = problemState;
	    this.parameters = parameters;
	    this.numActionsPerLevel = this.parameters.numActionsPerLevel;
	    this.leafValues = this.problemState.leafValues;
	    this.alphabeta = this.parameters.problemType === 'alphabeta';
	    this.expectimax = this.parameters.problemType === 'expectimax';
	    this.createTree();
	}

	MinimaxProblem.prototype.createLeaf = function(id, leafIndex) {
	    return new ValueNode(id, this.leafValues[leafIndex]);
	};

	MinimaxProblem.prototype.createTree = function() {
	    var action, child, currentLayer, leafIndex, level, nextLayer, node, nodeId, numActionsForLevel, _i, _j, _k, _len, _len1, _ref7, _results;
	    this.rootNode = new MaxNode(0);
	    this.nodes = {
		0: this.rootNode
	    };
	    currentLayer = [this.rootNode];
	    nextLayer = [];
	    leafIndex = 0;
	    nodeId = 1;
	    _ref7 = this.numActionsPerLevel;
	    _results = [];
	    for (level = _i = 0, _len = _ref7.length; _i < _len; level = ++_i) {
		numActionsForLevel = _ref7[level];
		for (_j = 0, _len1 = currentLayer.length; _j < _len1; _j++) {
		    node = currentLayer[_j];
		    for (action = _k = 0; 0 <= numActionsForLevel ? _k < numActionsForLevel : _k > numActionsForLevel; action = 0 <= numActionsForLevel ? ++_k : --_k) {
			if (level < this.numActionsPerLevel.length - 1) {
			    child = node.createChild(nodeId, this.expectimax);
			} else {
			    child = this.createLeaf(nodeId, leafIndex);
			    leafIndex += 1;
			}
			node.children.push(child);
			this.nodes[nodeId] = child;
			nextLayer.push(child);
			nodeId += 1;
		    }
		}
		currentLayer = nextLayer;
		_results.push(nextLayer = []);
	    }
	    return _results;
	};

	return MinimaxProblem;

    })();

NonZeroSumProblem = (function() {
	function NonZeroSumProblem(problemState, parameters) {
	    this.problemState = problemState;
	    this.parameters = parameters;
	    this.numActionsPerLevel = this.parameters.numActionsPerLevel;
	    this.leafValues = this.problemState.leafValues;
	    this.createTree();
	}

	NonZeroSumProblem.prototype.createLeaf = function(id, leafIndex) {
	    return new NonZeroSumValueNode(id, this.leafValues[leafIndex]);
	};

	NonZeroSumProblem.prototype.createTree = function() {
	    var action, child, currentLayer, leafIndex, level, nextLayer, node, nodeId, numActionsForLevel, _i, _j, _k, _len, _len1, _ref7, _results;
	    this.rootNode = new NonZeroSumFirstPlayerNode(0);
	    this.nodes = {
		0: this.rootNode
	    };
	    currentLayer = [this.rootNode];
	    nextLayer = [];
	    leafIndex = 0;
	    nodeId = 1;
	    _ref7 = this.numActionsPerLevel;
	    _results = [];
	    for (level = _i = 0, _len = _ref7.length; _i < _len; level = ++_i) {
		numActionsForLevel = _ref7[level];
		for (_j = 0, _len1 = currentLayer.length; _j < _len1; _j++) {
		    node = currentLayer[_j];
		    for (action = _k = 0; 0 <= numActionsForLevel ? _k < numActionsForLevel : _k > numActionsForLevel; action = 0 <= numActionsForLevel ? ++_k : --_k) {
			if (level < this.numActionsPerLevel.length - 1) {
			    child = node.createChild(nodeId);
			} else {
			    child = this.createLeaf(nodeId, leafIndex);
			    child.parent = node;
			    leafIndex += 1;
			}
			node.children.push(child);
			this.nodes[nodeId] = child;
			nextLayer.push(child);
			nodeId += 1;
		    }
		}
		currentLayer = nextLayer;
		_results.push(nextLayer = []);
	    }
	    return _results;
	};

	return NonZeroSumProblem;

    })();

root = typeof exports !== "undefined" && exports !== null ? exports : this;

root.MinimaxProblem = MinimaxProblem;

root.NonZeroSumProblem = NonZeroSumProblem;