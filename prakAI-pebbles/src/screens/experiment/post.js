console.log("begin experiment/post.js");
//uses global currentExperiment
displayNext();

sounds = ['mainSound', 'choiceSound'];
sounds.forEach(sound => {
	var soundElem = document.getElementById(sound);
	soundElem.preload = "auto"; 
});

