class NoOpGenerator extends XProblemGenerator

  constructor: (seed, @parameters = {}) ->

    super(seed, @parameters)

  generate: () ->

    return {}

root = exports ? this
root.generatorClass = NoOpGenerator
