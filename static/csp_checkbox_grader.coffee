class CSPCheckboxGrader extends XProblemGrader

  constructor: (@submission, @problemState, @parameters={}) ->

    super(@submission, @problemState, @parameters)

    @problemType = @parameters.problem_type
    @part = @parameters.part

  solve: () ->

    if @problemType == '4_queens'
      switch @part
        when 1
          # [x] [ ] [ ] [ ]
          # [ ] [ ] [ ] [x]
          # [ ] [x] [ ] [ ]
          # [ ] [ ] [x] [ ]
          @solution = 
            0: true
            1: false
            2: false
            3: false
            4: false
            5: false
            6: false
            7: true
            8: false
            9: true
            10: false
            11: false
            12: false
            13: false
            14: true
            15: false
        when 2
          # [x] [x] [ ] [ ]
          # [ ] [ ] [ ] [x]
          # [ ] [ ] [ ] [ ]
          # [ ] [ ] [x] [ ]
          @solution = 
            0: true
            1: true
            2: false
            3: false
            4: false
            5: false
            6: false
            7: true
            8: false
            9: false
            10: false
            11: false
            12: false
            13: false
            14: true
            15: false
        when 3
          # [ ] [x] [ ] [ ]
          # [ ] [ ] [ ] [x]
          # [x] [ ] [ ] [ ]
          # [ ] [ ] [x] [ ]
          @solution = 
            0: false
            1: true
            2: false
            3: false
            4: false
            5: false
            6: false
            7: true
            8: true
            9: false
            10: false
            11: false
            12: false
            13: false
            14: true
            15: false
    else if @problemType == 'campus'
      @solution = {}
      for i in [0..23]
        @solution[i] = false
      switch @part
        when 1
          #    (1,1)  (1,2)  (1,3)  (2,1)  (2,2)  (2,3)
          # A   [x]    [ ]    [x]    [ ]    [x]    [x]
          # B   [ ]    [ ]    [x]    [ ]    [ ]    [x]
          # C   [x]    [x]    [x]    [x]    [x]    [x]
          # D   [ ]    [x]    [x]    [x]    [ ]    [x]
          answers = [0, 2, 4, 5, 8, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 23]
          for i in answers
            @solution[i] = true
        when 2
          #    (1,1)  (1,2)  (1,3)  (2,1)  (2,2)  (2,3)
          # A   [ ]    [ ]    [x]    [ ]    [x]    [x]
          # B   [ ]    [ ]    [x]    [ ]    [ ]    [x]
          # C   [x]    [x]    [x]    [x]    [x]    [x]
          # D   [ ]    [x]    [x]    [x]    [ ]    [x]

          answers = [2, 4, 5, 8, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 23]
          
          for i in answers
            @solution[i] = true
        when 3
          #   (1,1)  (1,2)  (1,3)  (2,1)  (2,2)  (2,3)
          #A   [ ]    [ ]    [x]    [ ]    [x]    [x]
          #B   [ ]    [ ]    [x]    [ ]    [ ]    [x]
          #C   [ ]    [x]    [x]    [ ]    [x]    [x]
          #D   [ ]    [x]    [x]    [x]    [ ]    [x]

          answers = [2, 4, 5, 8, 11, 13, 14, 16, 17, 19, 20, 21, 23]
          
          for i in answers
            @solution[i] = true
        when 4

          # after d-a
          #   (1,1)  (1,2)  (1,3)  (2,1)  (2,2)  (2,3)
          #A   [ ]    [ ]    [x]    [ ]    [x]    [x]
          #B   [ ]    [ ]    [x]    [ ]    [ ]    [x]
          #C   [ ]    [x]    [x]    [ ]    [x]    [x]
          #D   [ ]    [x]    [x]    [x]    [ ]    [ ]
          # d-b d-c a-c b-c a-d b-d c-d
          # none of these change anything, queue empty after
          
          answers = [2, 4, 5, 8, 11, 13, 14, 16, 17, 19, 20, 21]
          
          for i in answers
            @solution[i] = true

        when 5

          #   (1,1)  (1,2)  (1,3)  (2,1)  (2,2)  (2,3)
          # A   [ ]    [ ]    [x]    [ ]    [ ]    [ ]
          # B   [ ]    [ ]    [ ]    [ ]    [ ]    [x]
          # C   [ ]    [ ]    [ ]    [ ]    [x]    [ ]
          # D   [ ]    [ ]    [ ]    [x]    [ ]    [ ]

          answers = [2, 11, 16, 21]

          for i in answers
            @solution[i] = true
        when 6

          #   (1,1)  (1,2)  (1,3)  (2,1)  (2,2)  (2,3)
          # A   [ ]    [ ]    [x]    [ ]    [ ]    [ ]
          # B   [ ]    [ ]    [ ]    [ ]    [ ]    [x]
          # C   [ ]    [ ]    [ ]    [ ]    [x]    [ ]
          # D   [ ]    [ ]    [ ]    [x]    [ ]    [ ]

          answers = [2, 11, 16, 21]

          for i in answers
            @solution[i] = true
    
    else if @problemType == 'prob_graph'
      @solution = {}
      for i in [0..48]
        @solution[i] = false
      switch @part
        when 1
          #     S   A   B   G   P   H   I
          # S       x   x   
          # A               x   
          # B         
          # G          
          # P   x                   x   x   
          # H      
          # I   
          answers = [1,2,10,28,33,34]
          for i in answers
            @solution[i] = true

    else if @problemType == 'time'
      @solution = {}
      for i in [0..39]
        @solution[i] = false
      switch @part
        when 1
          #     A1     A2     A3     A4     W1     W2     W3     W4
          # F   [x]    [x]    [x]    [x]    [ ]    [ ]    [ ]    [ ]
          # H   [x]    [x]    [x]    [ ]    [x]    [x]    [x]    [ ]
          # P   [x]    [x]    [x]    [x]    [x]    [x]    [x]    [x]
          # S   [x]    [x]    [ ]    [ ]    [x]    [x]    [ ]    [ ]
          # T   [x]    [x]    [x]    [ ]    [x]    [x]    [x]    [ ]
          answers = [0, 1, 2, 3, 8, 9, 10, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 28, 29, 32, 33, 34, 36, 37, 38]
          for i in answers
            @solution[i] = true

        when 2
          #     A1     A2     A3     A4     W1     W2     W3     W4
          # F   [x]    [ ]    [ ]    [ ]    [ ]    [ ]    [ ]    [ ]
          # H   [ ]    [ ]    [x]    [ ]    [ ]    [ ]    [x]    [ ]
          # P   [x]    [ ]    [x]    [x]    [x]    [ ]    [x]    [x]
          # S   [ ]    [x]    [ ]    [ ]    [ ]    [ ]    [ ]    [ ]
          # T   [ ]    [ ]    [ ]    [ ]    [ ]    [ ]    [x]    [ ]
          answers = [0, 10, 14, 16, 18, 19, 20, 22, 23, 25, 38] 
          for i in answers
            @solution[i] = true

        when 3
          #     A1     A2     A3     A4     W1     W2     W3     W4
          # F   [x]    [ ]    [ ]    [ ]    [ ]    [ ]    [ ]    [ ]
          # H   [ ]    [ ]    [x]    [ ]    [ ]    [ ]    [x]    [ ]
          # P   [ ]    [ ]    [x]    [x]    [x]    [ ]    [x]    [x]
          # S   [ ]    [x]    [ ]    [ ]    [ ]    [ ]    [ ]    [ ]
          # T   [ ]    [ ]    [ ]    [ ]    [ ]    [ ]    [x]    [ ]
          answers = [0, 10, 14, 18, 19, 20, 22, 23, 25, 38]
          for i in answers
            @solution[i] = true

        when 4
          #     A1     A2     A3     A4     W1     W2     W3     W4
          # F   [x]    [ ]    [ ]    [ ]    [ ]    [ ]    [ ]    [ ]
          # H   [ ]    [ ]    [x]    [ ]    [ ]    [ ]    [ ]    [ ]
          # P   [ ]    [ ]    [ ]    [ ]    [x]    [ ]    [ ]    [ ]
          # S   [ ]    [x]    [ ]    [ ]    [ ]    [ ]    [ ]    [ ]
          # T   [ ]    [ ]    [ ]    [ ]    [ ]    [ ]    [x]    [ ]
          answers = [0, 10, 20, 25, 38]
          for i in answers
            @solution[i] = true

        when 5
          #     A1     A2     A3     A4     W1     W2     W3     W4
          # F   [x]    [ ]    [ ]    [ ]    [ ]    [ ]    [ ]    [ ]
          # H   [ ]    [ ]    [x]    [ ]    [ ]    [ ]    [ ]    [ ]
          # P   [ ]    [ ]    [ ]    [ ]    [x]    [ ]    [ ]    [ ]
          # S   [ ]    [x]    [ ]    [ ]    [ ]    [ ]    [ ]    [ ]
          # T   [ ]    [ ]    [ ]    [ ]    [ ]    [ ]    [x]    [ ]
          answers = [0, 10, 20, 25, 38]
          for i in answers
            @solution[i] = true

    else if @problemType == 'office'
      @solution = {}
      switch @part
        when 1
          for i in [0..26]
            @solution[i] = false
          #      1      2      3      4      5      6 
          # A                 [x]    [x]              
          # X   [ ]    [x]    [x]    [x]    [x]    [x]
          # P   [x]                                   
          # D   [ ]    [ ]    [ ]    [x]    [x]    [x]
          # K   [ ]    [x]    [x]    [x]    [x]    [x]
          # Z   [ ]    [x]    [x]    [x]    [x]    [x]
          answers = [2, 3, 7, 8, 9, 10, 11, 12, 21, 22, 23, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35]
          for i in answers
            @solution[i] = true

        when 2
          for i in [0..21]
            @solution[i] = false
          #      1      2      3      4      5      6 
          # A                 [ ]    [x]              
          # X   [ ]    [x]    [ ]    [ ]    [ ]    [ ]
          # P   [x]                                   
          # D   [ ]    [ ]    [ ]    [ ]    [ ]    [x]
          # K                 [x]                     
          # Z   [ ]    [ ]    [ ]    [ ]    [x]    [ ]
          answers = [3, 7, 12, 23, 26, 34]
          for i in answers
            @solution[i] = true
    else if @problemType == 'exam'
      @solution = {}
      switch @part
        when 1     
      	  for i in [0 .. 41]
            @solution[i] = true
      	  #    q1   q2   q3   q4   q5   q6
      	  # B  [ ]  [ ]  [ ]  [ ]  [x]  [ ]
      	  # D  [x]  [x]  [x]  [x]  [ ]  [x]
      	  # F  [x]  [x]  [x]  [ ]  [ ]  [ ]
      	  # J  [x]  [x]  [x]  [x]  [x]  [x]
      	  # K  [x]  [x]  [x]  [ ]  [ ]  [ ]
      	  # M  [x]  [ ]  [x]  [ ]  [x]  [ ]
      	  # N  [x]  [x]  [x]  [x]  [x]  [ ]
      	  blanks = [0, 1, 2, 3, 5, 10, 15, 16, 17, 27, 28, 29, 31, 33, 35, 41]
      	  for i in blanks
            @solution[i] = false
        when 2
          for i in [0 .. 41]
            @solution[i] = false
          #    q1   q2   q3   q4   q5   q6
          # B  [ ]  [ ]  [ ]  [ ]  [x]  [ ]
          # D  [x]  [x]  [ ]  [ ]  [ ]  [ ]
          # F  [x]  [x]  [x]  [ ]  [ ]  [ ]
          # J  [ ]  [x]  [x]  [x]  [x]  [x]
          # K  [x]  [ ]  [ ]  [ ]  [ ]  [ ]
          # M  [x]  [ ]  [x]  [ ]  [x]  [ ]
          # N  [x]  [x]  [x]  [x]  [ ]  [ ]
          answers = [4, 6, 7, 12, 13, 14, 19, 20, 21, 22, 23, 24, 30, 32, 34, 36,37,38,39]
          for i in answers
            @solution[i] = true
  grade: () ->

    if not @solution?
      @solve()

    allCorrect = true

    for id, value of @solution
      valueCorrect = if @submission? then (value == @submission[id]) else false
      @evaluation[id] = valueCorrect

      if not valueCorrect
        allCorrect = false

    @evaluation['_all_'] = allCorrect
    return allCorrect

root = exports ? this
root.graderClass = CSPCheckboxGrader
