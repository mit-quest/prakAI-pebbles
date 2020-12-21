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
dataLog.push([
	'show-main',
	Date.now()
]);	

let setAppBackground = showImages.functions.setAppBackground;
let refreshStyling = showImages.functions.refreshStyling;

function displayNext () {
	currentExperiment++;
	if (currentExperiment > allDataLength - 1) {
		displayEnd([]);
	} else {
		playSound('mainSound');
		//hide choices
		expImages = document.getElementsByClassName('expImageDIV');
		for (const image of expImages) {
			image.style.visibility = 'hidden';
		}
		//wait blankDuration
		blankDuration = parseFloat(sessionStorage.getItem('blankDuration'));
		setTimeout(() => {
			showMain(allData[currentExperiment]);
			mainImageLink = document.getElementById('mainImageLink');
			mainImageLink.setAttribute('onclick', 'clickOnMain();')
		}, blankDuration);
	}
}

function clickOnMain () {
	logMain(currentExperiment);
	playSound("choiceSound");

	// hide main
	mainImageDIV = document.getElementById('mainImageDIV');
	mainImageDIV.style.visibility = 'hidden';
	
	// show noise
	noiseDIV = document.createElement('div');
	noiseDIV.style.position = 'absolute';
	noiseDIV.style.top = '0px';
	noiseDIV.style.left = '0px';
	noiseDIV.style.width = '3000px';
	noiseDIV.style.height = '3000px';
	noiseDIV.style.zIndex = '5';
	noiseDIV.class = '';
	noiseDIV.innerHTML = '<img style="width: 100%; height: 100%;" src="../../images/noise.gif" alt="">';

	targetElement = document.body;
	targetElement.appendChild(noiseDIV);

	noiseDuration = parseFloat(sessionStorage.getItem('noiseDuration'));
	// wait 2 seconds
	setTimeout(() => {
		//kill noise
		noiseDIV.parentNode.removeChild(noiseDIV);
		// show choices
		expImages = document.getElementsByClassName('expImageDIV');
		for (const image of expImages) {
			image.style.visibility = 'visible';
		}
	}, noiseDuration);

	// activate choices
	choiceImages = document.getElementsByClassName('expImageLink');
	index = -1;
	for (const image of choiceImages) {
		index++;
		mainImageLink = document.getElementById('mainImageLink');
		correct = mainImageLink.getAttribute('data-correct');
		image.setAttribute('onclick', 'logChoice(currentExperiment, ' + correct + ', ' + index + ');displayNext();');
	}

}

function logChoice (currentExperiment, mainImagePosition, selection) {

	dataLog.push([
		'choice',
		Date.now(), 
		currentExperiment, 
		mainImagePosition, 
		selection, 
		mainImagePosition == selection
	]);	

}

function logMain (currentExperiment) {

	dataLog.push([
		'main',
		Date.now(), 
		currentExperiment
	]);	

}

function displayEnd (data) {

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


