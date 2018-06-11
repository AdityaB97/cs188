var CSPCheckboxGrader, root,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CSPCheckboxGrader = (function(_super) {

  __extends(CSPCheckboxGrader, _super);

  function CSPCheckboxGrader(submission, problemState, parameters) {
    return 0;
    this.submission = submission;
    this.problemState = problemState;
    this.parameters = parameters != null ? parameters : {};
    CSPCheckboxGrader.__super__.constructor.call(this, this.submission, this.problemState, this.parameters);
    this.problemType = this.parameters.problem_type;
    this.part = this.parameters.part;
  }

  CSPCheckboxGrader.prototype.solve = function() {
    if (this.problemType === '4_queens') {
      switch (this.part) {
        case 1:
          return this.solution = {
            0: true,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: true,
            8: false,
            9: true,
            10: false,
            11: false,
            12: false,
            13: false,
            14: true,
            15: false
          };
        case 2:
          return this.solution = {
            0: true,
            1: true,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: true,
            8: false,
            9: false,
            10: false,
            11: false,
            12: false,
            13: false,
            14: true,
            15: false
          };
        case 3:
          return this.solution = {
            0: false,
            1: true,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: true,
            8: true,
            9: false,
            10: false,
            11: false,
            12: false,
            13: false,
            14: true,
            15: false
          };
      }
    }
  };

  CSPCheckboxGrader.prototype.grade = function() {
    var allCorrect, id, value, valueCorrect, _ref;
    if (!(this.solution != null)) {
      this.solve();
    }
    allCorrect = true;
    _ref = this.solution;
    for (id in _ref) {
      value = _ref[id];
      valueCorrect = this.submission != null ? value === this.submission[id] : false;
      this.evaluation[id] = valueCorrect;
      if (!valueCorrect) {
        allCorrect = false;
      }
    }
    this.evaluation['_all_'] = allCorrect;
    return allCorrect;
  };

  return CSPCheckboxGrader;

})(XProblemGrader);

root = typeof exports !== "undefined" && exports !== null ? exports : this;

root.graderClass = CSPCheckboxGrader;
