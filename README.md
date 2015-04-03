# Memory Game (AngularJS Demo)
Match each square by color! Click the squares to flip them. Score multipliers are applied if one or both of your matching squares were viewed for the first time. Also check out the 'Peek' button!

#### Live Demo: http://mozzor.com/demos/memory

## Features
**Score Multiplier:** Each match is worth **1pt** minimum. If **ONE** of the matching squares has not been viewed before, the match is worth **3pts**. If **BOTH** of the matching squares have not been viewed before, the match is worth **5pts**. Use logical deduction to score the maximum amount of points!

**Peek:** We all know this game can be frustrating, so take advantage of the Peek button! After clicking the button, the screen will darken and the cards will glow, giving the user **5 seconds** to hover over any card they wish to peek at its color. Once the timer expires, the Peek button can no longer be clicked again. It's up to the user to decide whether they want to scan the board early on, or save it for later to score crucial mulitpliers.

## Architecture
This app was built to serve as an AngularJS demo - no jQuery or javascript header code used! The architecture consists of one view, the HTML file, and one controller, app.js. The main view is partitioned into two sections, the sideBar and the container. In the sideBar, we have the game title, the Reset and Peek buttons, and three text labels (current score, high score, and timer). The container holds a 5X4 row of translucent squares, which serve as the "cards" in the memory game.

* **Angular.js**
  * Controller
    * One controller is used, containing six different `$scope` functions. Example functions: toggling a square and determining how many points should be awarded, starting/ending the timer, initalizing/reseting the game, and checking for end game conditions
  * Directives
    * Many ng-directives are utilized in the view, and logic in the expressions help implement functionality that changes the score on the page, displays and changes the score multiplier, sets square color if it's "flipped"
    * Custom directive created to implement the mouseover/mouseout effects when 'Peek' is activated
  * Misc
    * Third party library used for end game dialog box: [ngDialog](https://github.com/likeastore/ngDialog)
    * Open source javascript functions used to randomize the color array and create a javascript timer
* **CSS**
  * Transitions (linear) used on square "flipping", as well as endgame dimming overlay
  * Effects: Box shadow used on squares, blur effect used on squares when 'Peek' enabled, gradients used on buttons


## Contact
Any questions can be directed to jlewkovich@mozzor.com
