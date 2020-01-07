console.log("begin experiment/pre.js");

let allData = JSON.parse(sessionStorage.getItem("allData"));
let allDataLength = Object.keys(allData).length;

let currentExperiment = -1;
let dataLog = [];

let displaySetting, mainImage, images, mainImagePosition;
let leftDiv, rightDiv;
let mainContent, choicesContent;

let showImages = require('../../scripts/showImages.js');
let showMain = showImages.functions.showMain;
let hideMain = showImages.functions.hideMain;
let showChoices = showImages.functions.showChoices;
let setAppBackground = showImages.functions.setAppBackground;
let refreshStyling = showImages.functions.refreshStyling;

function displayNext() {
	currentExperiment++;
	if (currentExperiment > allDataLength - 1) {
		displayEnd([]);
	} else {
		clearDisplay();
		playSound('mainSound');
		showMain(allData[currentExperiment]);
		mainImage = document.getElementById('mainImageLink');
		mainImage.setAttribute('onclick', 'clickOnMain();');
	}
}

function clickOnMain () {
	logMain(currentExperiment);
	playSound("choiceSound");
	hideMain();
	showChoices();
	choiceImages = document.getElementsByClassName('expImageLink');
	index = -1;
	for (const image of choiceImages) {
		index++;
		mainImageLink = document.getElementById('mainImageLink');
		correct = mainImageLink.getAttribute('data-correct');
		image.setAttribute('onclick', 'logChoice(currentExperiment, ' + correct + ', ' + index + ');displayNext();');
	}

}

function clearDisplay() {
	experimentTable = document.getElementById('experimentTable');
	while (experimentTable.lastChild) {
		experimentTable.removeChild(experimentTable.lastChild);
	}
}

function logChoice(currentExperiment, mainImagePosition, selection) {

	dataLog.push([
		'choice',
		Date.now(), 
		currentExperiment, 
		mainImagePosition, 
		selection, 
		mainImagePosition == selection
	]);	

}

function logMain(currentExperiment) {

	dataLog.push([
		'main',
		Date.now(), 
		currentExperiment
	]);	

}

function displayEnd(data) {

	// Save dataLog into session storage
	sessionStorage.setItem("dataLog", JSON.stringify(dataLog));

	const { getCurrentWindow, app } = require('electron').remote;
	const path = require('path');

	//start screen 
	let mainWindow = getCurrentWindow();
	let content = path.join(app.getAppPath(), 'src', 'screens', 'results', 'index.html');
	mainWindow.loadURL(content);

}

function playSound (type) {
	var soundElem = document.getElementById(type);
	soundElem.play();
}


