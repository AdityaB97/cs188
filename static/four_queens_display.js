var FourQueensDisplay, root,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

FourQueensDisplay = (function(_super) {

  __extends(FourQueensDisplay, _super);

  function FourQueensDisplay(state, submission, evaluation, container, submissionField, parameters) {
    return 0;
    this.state = state;
    this.submission = submission;
    this.evaluation = evaluation;
    this.container = container;
    this.submissionField = submissionField;
    this.parameters = parameters != null ? parameters : {};
    FourQueensDisplay.__super__.constructor.call(this, this.state, this.submission, this.evaluation, this.container, this.submissionField, this.parameters);
    this.createSubmission();
    this.updateSubmission();
    this.showResult = this.evaluation != null;
    this.part = this.parameters.part;
    this.initialConfiguration = {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: true,
      8: true,
      9: true,
      10: false,
      11: false,
      12: false,
      13: false,
      14: true,
      15: false
    };
  }

  FourQueensDisplay.prototype.createCheckboxTable = function() {
    var i, index, j, template, _i, _j;
    template = "<table style='border: 1px solid black; margin: auto'>";
    for (i = _i = 0; _i <= 3; i = ++_i) {
      template += "<tr>";
      for (j = _j = 0; _j <= 3; j = ++_j) {
        index = i * 4 + j;
        template += "<td style='padding: 5px; height: 25px; width: 25px; border: 1px solid black; text-align: center;'>";
        template += "<input data-index=" + index + " class='checkbox_" + index + "' type='checkbox'";
        if (this.newSubmission[i * 4 + j]) {
          template += "checked=checked";
        }
        template += "/>";
        template += "</td>";
      }
      template += "</tr>";
    }
    return template;
  };

  FourQueensDisplay.prototype.getConfiguration = function(partNumber) {
    var configuration, container, dataEl;
    container = $("#four_queens_" + partNumber);
    dataEl = container.parent().prevAll('input');
    configuration = JSON.parse(dataEl.val());
    return configuration;
  };

  FourQueensDisplay.prototype.setConfiguration = function(configuration) {
    var checkbox, id, value, _results;
    _results = [];
    for (id in configuration) {
      value = configuration[id];
      checkbox = this.problemContainer.find(".checkbox_" + id);
      if (value) {
        checkbox.attr('checked', 'checked');
        this.updateValue(id, true);
        console.log(this.newSubmission);
        console.log(id);
        _results.push(console.log(this.newSubmission));
      } else {
        checkbox.attr('checked', null);
        this.updateValue(id, false);
        console.log(this.newSubmission);
        console.log(id);
        _results.push(console.log(this.newSubmission));
      }
    }
    return _results;
  };

  FourQueensDisplay.prototype.render = function() {
    var _this = this;
    this.container.css('overflow', 'auto');
    this.problemContainer = $('<div>').addClass('four_queens').attr('id', "four_queens_" + this.part);
    this.problemContainer.html(this.createCheckboxTable());
    if (this.showResult) {
      this.correctnessContainer = $("<div>").css('text-align', 'center').css('margin-top', '5px');
      this.correctness = $('<p>').addClass('status');
      this.correctnessContainer.append(this.correctness);
      this.problemContainer.append(this.correctnessContainer);
      if (this.evaluation['_all_']) {
        this.correctnessContainer.addClass('correct');
      } else {
        this.correctnessContainer.addClass('incorrect');
      }
    }
    this.buttonContainer = $('<div>').css('text-align', 'center').css('margin-top', '5px');
    this.setButton = $('<input type="button">');
    if (this.part === 1) {
      this.setButton.val("Set to initial configuration");
      this.setButton.click(function() {
        return _this.setConfiguration(_this.initialConfiguration);
      });
    } else {
      this.setButton.val("Set to configuration from Part " + (this.part - 1));
      this.setButton.click(function() {
        return _this.setConfiguration(_this.getConfiguration(_this.part - 1));
      });
    }
    this.buttonContainer.append(this.setButton);
    this.problemContainer.append(this.buttonContainer);
    this.container.append(this.problemContainer);
    return this.problemContainer.find('input').bind("change click", function(event) {
      var checkbox, id;
      checkbox = $(event.target);
      id = checkbox.data('index');
      if (checkbox.attr('checked')) {
        return _this.updateValue(id, true);
      } else {
        return _this.updateValue(id, false);
      }
    });
  };

  FourQueensDisplay.prototype.createSubmission = function() {
    var id, value, _ref, _results;
    this.newSubmission = {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
      11: false,
      12: false,
      13: false,
      14: false,
      15: false
    };
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

  FourQueensDisplay.prototype.partStatus = function(id, value) {
    if (!this.liveFeedback) {
      if (!(this.submission != null) || this.submission[id] !== value || !(this.evaluation != null) || !(this.evaluation[id] != null)) {
        return "unknown";
      } else {
        if (this.evaluation[id]) {
          return "correct";
        } else {
          return "incorrect";
        }
      }
    } else {
      return console.error("Live feedback not implemented yet.");
    }
  };

  FourQueensDisplay.prototype.updateValue = function(id, value) {
    this.newSubmission[id] = value;
    return this.updateSubmission();
  };

  FourQueensDisplay.prototype.getCurrentSubmission = function() {
    return this.newSubmission;
  };

  return FourQueensDisplay;

})(XProblemDisplay);

root = typeof exports !== "undefined" && exports !== null ? exports : this;

root.FourQueensDisplay = FourQueensDisplay;