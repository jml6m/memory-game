//Initiate app
var app = angular.module('memory', ['ngDialog']);

//Colors for Squares
var colors = [
    'darkgreen', 'darkgreen', 'blue', 'blue', 'maroon', 'maroon',
    'indigo', 'indigo', 'goldenrod', 'goldenrod', 'chartreuse', 'chartreuse',
    'deeppink', 'deeppink', 'dimgray', 'dimgray', 'aqua', 'aqua',
    'saddlebrown', 'saddlebrown'
];

//Main Controller
app.controller('MainCtrl', function($scope, ngDialog) {

    /*
    * TOGGLE SQUARE
    * Responsible for flipping squares, detecting matches
    * and applying score multipliers
    */
    $scope.toggle = function(obj) {
        if(!obj.flipped && !$scope.timerActive) {
            var oldScore = $scope.score;
            if($scope.selected === -1) {
                obj.flipped = true;
                $scope.selected = obj.id;
            } else if($scope.squares[$scope.selected].color !== obj.color) {
                $scope.squares[$scope.selected].multiplier = false;
                $scope.squares[$scope.selected].flipped = false;
                $scope.selected = -1;
                if($scope.score > 0) {
                    $scope.score--;
                    $scope.scoreChanged = -1;
                }
            } else {
                obj.flipped = true;

                //Determine multiplier effect
                var addedScore = 1;
                if(obj.multiplier) {
                    addedScore += 2;
                }
                if($scope.squares[$scope.selected].multiplier) {
                    addedScore += 2;
                }

                $scope.selected = -1;
                $scope.score += addedScore;
                $scope.scoreChanged = addedScore;

                //Check for end game
                $scope.checkEndgame();
            }
        }
    };

    //Check for endgame conditions
    $scope.checkEndgame = function() {
        var endGame = true;
        angular.forEach($scope.squares, function(val) {
            if(!val.flipped) {
                endGame = false;
            }
        });

        if(endGame) {
            if($scope.highScore < $scope.score) {
                $scope.highScore = $scope.score;
            }
            ngDialog.open({
                template: 'dialogTemplate',
                className: 'ngdialog-theme-default',
                scope: $scope
            });
        }
    };

    //Reset game after Endgame dialog closes
    $scope.$on('ngDialog.closed', function () {
        $scope.$apply($scope.reset());
    });

    //Initialize/Reset Game
    $scope.reset = function() {
        //Attributes
        $scope.selected = -1; //Track selected color, default = -1
        $scope.timerActive = false; //True if Peek enabled
        $scope.scoreChanged = 0;
        $scope.score = 0; 
        $scope.peekLock = false; //Peek button lock

        //Fill squares array (random order)
        shuffle(colors);
        $scope.squares = [];
        for(var i = 0; i < colors.length; i++) {
            var square = {
                'id': i, //Unique ID
                'color': colors[i], //Color for memory
                'flipped': false, //color shows if flipped==true
                'multiplier': true //Score multiplier enabled
            };
            $scope.squares.push(square);
        }
    };

    //Activate Peek
    $scope.peek = function() {
        if(!$scope.peekLock) {
            $scope.timerActive = true;
            var obj = document.getElementById('timerText');
            startTimer(5000, obj, $scope.endPeek);
        }
    };

    //End Peek
    $scope.endPeek = function() {
        $scope.$apply($scope.timerActive = false);
        $scope.$apply($scope.peekLock = true);
    };

    //Start Game
    $scope.reset();
    $scope.highScore = 0; //Don't want this to reset
});

//Applied to squares, changes CSS on mouseevents
app.directive('hoverDirective', function () {
    return {
        link: function ($scope, element, attrs) {
            var square = element.scope().square;
            element.bind('mouseenter', function () {
                if($scope.timerActive && !square.flipped) {
                    element.removeClass('peek');
                    element.css('background-color', square.color);
                }
            });
            element.bind('mouseleave', function () {
                /*
                * Small hack added to this if-check, handles case where
                * timer hits zero before mouseleave event occurs
                */
                if(!square.flipped &&
                        ((element.css('background-color') != '#151515') || $scope.timerActive)) {
                    //Keep this if-check
                    if($scope.timerActive)
                        element.addClass('peek');

                    if(square.flipped) {
                        element.css('background-color', square.color);
                    } else {
                        element.css('background-color', '#151515');
                    }
                }
            });
        }
    };
});

//Javascript timer
function startTimer(duration, display, callback) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;

    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - ((Date.now() - start) | 0);
        var temp = diff/1000;

        display.textContent = (temp >= 0 ? temp.toFixed(1) : 0); 

        if (diff <= 0) {
            //Execute callback() when finished
            clearInterval(intervalId);
            callback();
        }
    };

    // we don't want to wait a full second before the timer starts
    timer();
    var intervalId = setInterval(timer, 1);
}

//Knuth Shuffle (helper function)
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}