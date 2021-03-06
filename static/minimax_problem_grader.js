var MinimaxProblemGrader, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MinimaxProblemGrader = (function(_super) {
	__extends(MinimaxProblemGrader, _super);

	function MinimaxProblemGrader(submission, problemState, parameters) {
	    this.submission = submission;
	    this.problemState = problemState;
	    this.parameters = parameters != null ? parameters : {};
	    MinimaxProblemGrader.__super__.constructor.call(this, this.submission, this.problemState, this.parameters);
	    this.alphabeta = this.parameters.problemType === 'alphabeta';
	    this.expectimax = this.parameters.problemType === 'expectimax';
	    this.nonzerosum = this.parameters.problemType === 'nonzerosum';
	    this.ordering = this.parameters.problemType === 'ordering';
	    this.orderingSolution = ["L", "R", "E", "x", "R", "E", "R"];
	    if (this.nonzerosum) {
		this.problem = new NonZeroSumProblem(this.problemState, this.parameters);
	    } else {
		this.problem = new MinimaxProblem(this.problemState, this.parameters);
	    }
	}

	MinimaxProblemGrader.prototype.solve = function() {
	    var child, i, id, node, queue, value, _i, _j, _len, _len1, _ref, _ref1, _ref2, _results;
	    this.solution = {};
	    if (this.alphabeta) {
		this.problem.rootNode.getValueAlphaBeta(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
	    } else {
		this.problem.rootNode.getValue();
	    }
	    queue = [this.problem.rootNode];
	    i = 0;
	    while (queue.length > 0) {
		node = queue.pop();
		if (this.alphabeta) {
		    _ref = node.children;
		    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			child = _ref[_i];
			this.solution[child.id + '_alpha'] = child.alpha;
			this.solution[child.id + '_beta'] = child.beta;
		    }
		}
		if (node.constructor.name !== "ValueNode" && node.constructor.name !== "NonZeroSumValueNode") {
		    this.solution[node.id] = node.value;
		    _ref1 = node.children;
		    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
			child = _ref1[_j];
			queue.push(child);
		    }
		    if (this.ordering) {
			this.solution[node.id] = this.orderingSolution[i];
			i = i + 1;
		    }
		}
	    }
	    _ref2 = this.solution;
	    _results = [];
	    for (id in _ref2) {
		value = _ref2[id];
		if (value === Number.POSITIVE_INFINITY) {
		    this.solution[id] = "i";
		}
		if (value === Number.NEGATIVE_INFINITY) {
		    this.solution[id] = "-i";
		}
		if (value == null) {
		    _results.push(this.solution[id] = 'x');
		} else {
		    _results.push(void 0);
		}
	    }
	    return _results;
	};

	MinimaxProblemGrader.prototype.grade = function() {
	    var allCorrect, id, value, valueCorrect, _ref;
	    if (this.solution == null) {
		this.solve();
	    }
	    allCorrect = true;
	    _ref = this.solution;
	    for (id in _ref) {
		value = _ref[id];
		if (this.submission == null) {
		    this.evaluation[id] = false;
		    allCorrect = false;
		    continue;
		}
		if (this.nonzerosum) {
		    if (this.submission[id] == null) {
			valueCorrect = false;
		    } else {
			valueCorrect = (value[0] === this.submission[id][0]) && (value[1] === this.submission[id][1]);
		    }
		} else if (this.ordering) {
		    if (value === "E") {
			if (this.submission[id] === "R" || this.submission[id] === "L") {
			    valueCorrect = true;
			} else {
			    valueCorrect = false;
			}
		    } else {
			valueCorrect = value === this.submission[id];
		    }
		} else {
		    valueCorrect = value === this.submission[id];
		}
		this.evaluation[id] = valueCorrect;
		if (!valueCorrect) {
		    allCorrect = false;
		}
	    }
	    this.evaluation['_all_'] = allCorrect;
	    return allCorrect;
	};

	return MinimaxProblemGrader;

    })(XProblemGrader);

root = typeof exports !== "undefined" && exports !== null ? exports : this;

root.graderClass = MinimaxProblemGrader;