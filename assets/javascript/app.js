/*Languages used: jQuery, Javascript, HTML, CSS
Option One: Basic Triva Quiz 
_____________________Project Requirements___________________
Create a trivia form with multiple choice or true/false options (your choice).
The player will have a limited amount of time to finish the quiz. 
The game ends when the time runs out. The page will reveal the number of questions that players answer correctly and incorrectly.
Don't let the player pick more than one answer per question.
Don't forget to include a countdown timer.
_____________________Pseudocode______________________
On the landing page there will be a simple header and button.
Upon the submit event of the button, the quiz will start.
Division1 will display a timer.
Division2 will contain 2 nested for loops.
Loop 1 for the length of the array of questions
    $write the html for the questions to the page
        Loop 2 for the length of the radio buttons
            $write the html of the radio buttons to the page
At the end of the loop $write a submit button
The game will end upon the countdown = 0 or if user hits submit.
$write the results to the html page
Provide option to reset the game and start over.
3 variables to
1) Right 
2) Wrong 
3) Unanswered 
4) Hold the user selection
An object with 2 arrays
Question 1 array
Radio Buttons 2 Array
Right Answer
*/
var userPick = []; //Array to hold the user choices, will populate with null in a for loop later
var correctAnswers = 0;
var wrongAnswers = 0;
var missedAnswers = 0;
var timeDisplay;
var counter = 61;
var intervalID;
var questions = [{
    question: "What Lew Alcindor-led team eliminated the Golden State Warriors from the 1972 NBA playoffs?",
    choices: ["Milwaukee Bucks", "Chicago Bulls", "Boston Celtics", "Los Angeles Lakers"],
    answer: 0
},
{
    question: "What Golden State Warrior entered a hospital in December 1987 for treatment for an alchol problem?",
    choices: ["Winston Garlan", "Chris Washburn", "Phil Ford", "Chris Mullin"],
    answer: 3
},
{
    question: "What Golden State Warrior was named the MVP of the 1975 NBA Finals?",
    choices: ["Cliffor Ray", "Nate Thurmond", "Keith Wilkes", "Rick Barry"],
    answer: 3
},
{
    question: "In 1994, the Golden State Warriors traded Chis Weber to the Bullets for 3 draft picks and whom?",
    choices: ["Clifford Rozier", "Rony Seikaly", "Carlos Rogers", "Tom Gugliotta"],
    answer: 3
},
{
    question: "On March 12, 2007, the Golden State Warriors snapped which teams 17-game winning streak?",
    choices: ["San Antonio Spurs", "Detroit Pistons", "Dallas Mavericks", "Phoenix Suns",],
    answer: 2
},
{
    question: "In what season did the Golden State Warriors begin playing at the Oracle Arena?",
    choices: ["1999-2000", "1997-1998", "1996-1997", "1998-1999"],
    answer: 1
},
{
    question: "During the 2006-07 season, the Golden State Warriors finished second in team scoring to which team?",
    choices: ["Denver Nuggest", "Phoenix Suns", "Washington Wizards", "Dallas Mavericks"],
    answer: 1
},
{
    question: "In 1980, the Golden State Warriors traded a first-round draft pick and whom to the Boston Celtics?",
    choices: ["Wayne Cooper", "Phil Smith", "Robert Parrish", "John Lucas"],
    answer: 2
},
{
    question: "What was the first year the Warrior played under the Golden State name in the NBA?",
    choices: ["1954", "1949", "1962", "1971"],
    answer: 3
},
{
    question: "During 2006-07, Don Nelson replaced which Golden State Warriors coach?",
    choices: ["Dave Cowen", "Brian Winters", "Mike Montgomery", "Eric Musselman"],
    answer: 2
},
{
    question: "Which 1970's Golden State Warriors player was known for his old-fashioned underhand free throws?",
    choices: ["Nate Thrumond", "Keith Wilkes", "Rich Barry", "Jeff Mullins"],
    answer: 2
},
{
    question: "In 1991, who did the Golden State Warriors trade to the Sacramento Kings for Billy Owens?",
    choices: ["Tim Hardaway", "Kenny Battle", "Chris Mullin", "Mitch Richmond"],
    answer: 3
},
{
    question: "How many games did the Golden State Warriors win during the 2007 NBA playoffs?",
    choices: ["5", "7", "4", "6"],
    answer: 0
},
{
    question: "In 2001, the Golden State Warriors set a team record for worsk season by winning how many games?",
    choices: ["16", "19", "18", "17"],
    answer: 3
},
{
    question: "True or False: The Golden State Warriors failed to make the NBA playoffs from the years 1990 - 1999?",
    choices: ["TRUE", "FALSE"],
    answer: 1
},
{
    question: "Stephen Jackson was one of four players acquired from the Indiana Pacers in January of 2007?",
    choices: ["TRUE", "FALSE"],
    answer: 0
}
];
//To capture the missed responses, populate the userPick array with all nulls equal to the length of the questions object
for (var i = 0; i < questions.length; i++) {
    userPick[i] = null;
}

//Quiz starts here with ready function
$(document).ready(function () {

    $("#startGame").click(function () {
        //Attach the setInterval object to a variable so that we can stop it later
        intervalID = setInterval(decrement, 1000);
        //Use jQuery to call the function to write the questions to the html
        writeQuestions();
        $("#startGame").hide();
        writeSubmitButton();

        $("#submitQuiz").click(function () {
            showResults();
        });
        //This is the listener that will record the function that tracks what the user has clicked
        //This works because we structured the radio button groups with index x and i
        //This allows me to know what question the user picked (i) and the response (value).
        $("input").click(function () {
            userPick[this.name] = this.value;
        });
    });
});

//Use a nested for loop to go through each question and each radio button option and write to page
function writeQuestions() {
    for (var i = 0; i < questions.length; i++) {
        $("#formQuiz").append(questions[i].question + "</br>");
        //From within the first loop, write out the radio option buttons and assign them values and names of x and i respectively for later evaluation
        for (var x = 0; x < questions[i].choices.length; x++) {
            $("#formQuiz").append("<label class='radio-inline'><input value='" + x + "' type='radio' name='" + i + "'>" + questions[i].choices[x] + "</label>");
        }
        $("#formQuiz").append("<br/><br/>");
    }
}
//Write the button to submit the form in the event the user does not want to wait for the timer expire event.
function writeSubmitButton() {
    $("#formSubmit").append("<button id='submitQuiz' class='btn btn-primary btn-lg'>Submit</button>");
}

//Countdown counter
function decrement() {
    counter--;
    $("#timeRemaining").html("<h2><mark>" + counter + " seconds remaining.</mark></h2>");
    if (counter === 0) {
        alert("Time Up!");
        //Do additional logic and process the quiz results
        showResults();
    }
}
//Write the results to the HTML
function showResults() {
    //Hide the questions | options | and submit button
    $("#formQuiz").hide();
    $("#timeRemaining").hide();
    $("#submitQuiz").hide();
    //userPick[] was used to record the player responses 
    for (i = 0; i < questions.length; i++) {
        // Note: === evaluated to NaN so == was required.
        if (questions[i].answer == userPick[i]) {
            correctAnswers++;
        }
        // Unanswered questions
        else if (userPick[i] === null) {
            missedAnswers++;
        }
        // Logic dictates the only other possible outcome is a wrong answer
        else {
            wrongAnswers++;
        }
    }
    // Assigning an HTML id to a variable 
    var qR = $("#quizResults");
    $(qR).append("<p>ALL DONE!</p>");
    $(qR).append("<p>Correct Answers: " + correctAnswers + "</p>");
    $(qR).append("<p>Incorrect Answers: " + wrongAnswers + "</p>");
    $(qR).append("<p>Unanswered: " + missedAnswers + "</p>");
    //You must clear intervalID or it will repeat
    clearInterval(intervalID);
}
