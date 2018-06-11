var NoOpGenerator, root,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

NoOpGenerator = (function(_super) {

  __extends(NoOpGenerator, _super);

  function NoOpGenerator(seed, parameters) {
    return 0;
    this.parameters = parameters != null ? parameters : {};
    NoOpGenerator.__super__.constructor.call(this, seed, this.parameters);
  }

  NoOpGenerator.prototype.generate = function() {
    return {};
  };

  return NoOpGenerator;

})(XProblemGenerator);

root = typeof exports !== "undefined" && exports !== null ? exports : this;

root.generatorClass = NoOpGenerator;