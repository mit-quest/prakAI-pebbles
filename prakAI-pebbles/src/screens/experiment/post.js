console.log("begin experiment/post.js");

setAppBackground();
refreshStyling();

displayNext();

sounds = ['mainSound', 'choiceSound'];
sounds.forEach(sound => {
	var soundElem = document.getElementById(sound);
	soundElem.preload = "auto"; 
});

