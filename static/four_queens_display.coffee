class FourQueensDisplay extends XProblemDisplay

  constructor: (@state, @submission, @evaluation, @container, @submissionField, @parameters={}) ->

    super(@state, @submission, @evaluation, @container, @submissionField, @parameters)

    @createSubmission()
    @updateSubmission()

    @showResult = @evaluation?

    @part = @parameters.part

    @initialConfiguration = 
      0: false
      1: false
      2: false
      3: false
      4: false
      5: false
      6: false
      7: true
      8: true
      9: true
      10: false
      11: false
      12: false
      13: false
      14: true
      15: false

  createCheckboxTable: () ->

    template = "<table style='border: 1px solid black; margin: auto'>"
    for i in [0..3]
      template += "<tr>"
      for j in [0..3]
        index = i * 4 + j
        template += "<td style='padding: 5px; height: 25px; width: 25px; border: 1px solid black; text-align: center;'>"
        template += "<input data-index=#{index} class='checkbox_#{index}' type='checkbox'"
        if @newSubmission[i * 4 + j]
          template += "checked=checked"
        template += "/>"
        template += "</td>"
      template += "</tr>"
    return template

  getConfiguration: (partNumber) ->
    container = $("#four_queens_#{partNumber}")
    dataEl = container.parent().prevAll('input')
    configuration = JSON.parse(dataEl.val())
    return configuration

  setConfiguration: (configuration) ->
    for id, value of configuration
      checkbox = @problemContainer.find(".checkbox_#{id}")
      if value
        checkbox.attr('checked', 'checked')
        @updateValue(id, true)
        console.log @newSubmission
        console.log id
        console.log @newSubmission
      else
        checkbox.attr('checked', null)
        @updateValue(id, false)
        console.log @newSubmission
        console.log id
        console.log @newSubmission

  render: () ->

    @container.css('overflow', 'auto')
    @problemContainer = $('<div>').addClass('four_queens').attr('id', "four_queens_#{@part}")
    @problemContainer.html(@createCheckboxTable())
    if @showResult
      @correctnessContainer = $("<div>").css('text-align', 'center').css('margin-top', '5px')
      @correctness = $('<p>').addClass('status')
      @correctnessContainer.append(@correctness)
      @problemContainer.append(@correctnessContainer)
      if @evaluation['_all_']
        @correctnessContainer.addClass('correct')
      else
        @correctnessContainer.addClass('incorrect')
    @buttonContainer = $('<div>').css('text-align', 'center').css('margin-top', '5px')
    @setButton = $('<input type="button">')
    if @part == 1
      @setButton.val("Set to initial configuration")
      @setButton.click =>
        @setConfiguration(@initialConfiguration)
    else
      @setButton.val("Set to configuration from Part #{@part - 1}")
      @setButton.click =>
        @setConfiguration(@getConfiguration(@part-1))
    @buttonContainer.append(@setButton)
    @problemContainer.append(@buttonContainer)
    @container.append(@problemContainer)

    @problemContainer.find('input').bind "change click", (event) =>
      checkbox = $(event.target)
      id = checkbox.data('index')
      if checkbox.attr('checked')
        @updateValue(id, true)
      else
        @updateValue(id, false)

  createSubmission: () ->

    @newSubmission = 
      0: false
      1: false
      2: false
      3: false
      4: false
      5: false
      6: false
      7: false
      8: false
      9: false
      10: false
      11: false
      12: false
      13: false
      14: false
      15: false

    if @submission?
      for id, value of @submission
        @newSubmission[id] = value

  partStatus: (id, value) ->
    if not @liveFeedback
      if not @submission? or @submission[id] != value or not @evaluation? or not @evaluation[id]?
        return "unknown"
      else
        return if @evaluation[id] then "correct" else "incorrect"
    else
      console.error "Live feedback not implemented yet."

  updateValue: (id, value) ->
    @newSubmission[id] = value
    @updateSubmission()

  getCurrentSubmission: () ->
    return @newSubmission

root = exports ? this
root.FourQueensDisplay = FourQueensDisplay
