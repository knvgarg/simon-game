var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}
function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

var level = 0;
var flag = false;
function nextSequence() {
	userClickedPattern = [];
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChoosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChoosenColor);
	$("#" + randomChoosenColor)
		.fadeOut(100)
		.fadeIn(100);
	playSound(randomChoosenColor);
	$("#level-title").text("Level " + level);
	level++;
}
$(this).keypress(function () {
	if (!flag) {
		$("#level-tilte").text("Level " + level);
		level++;
		nextSequence();
		flag = true;
		flag2 = true;
	}
});
var flag2 = false;
$(this).click(function () {
	if (!flag2) {
		$("#level-tilte").text("Level " + level);
		level++;
		nextSequence();
		flag2 = true;
		flag = true;
	}
});

$(".btn").click(function () {
	if (flag2) {
		var userChoosenColor = $(this).attr("id");
		userClickedPattern.push(userChoosenColor);
		playSound(userChoosenColor);
		$("#" + userChoosenColor)
			.fadeOut(100)
			.fadeIn(100);
		animatePress(userChoosenColor);
		checkAnswer(userClickedPattern.length - 1);
	}
});

function startOver() {
	level = 0;
	gamePattern = [];
	flag = false;
	setTimeout(function () {
		flag2 = false;
	}, 1000);
}

function checkAnswer(curretLevel) {
	if (gamePattern[curretLevel] === userClickedPattern[curretLevel]) {
		if (userClickedPattern.length == gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);
		$("h1").text("Game Over, Press Any Key to Restart");
		startOver();
	}
}
