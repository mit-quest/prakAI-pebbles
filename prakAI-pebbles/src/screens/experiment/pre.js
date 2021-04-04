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

	//show a cross before displaying the image
	waitScreen = document.getElementById('waitscreen');
	//invert color of the cross if the app background is dark
	if (isDark(document.body.style.backgroundColor)) {
		document.getElementById('cross').style.filter="invert(100%)";
	}
	waitScreen.style.visibility = 'visible';

	//hide nextButton
	document.getElementById("mainImageDIV").style.visibility = 'hidden';
	expImages = document.getElementsByClassName('expImageDIV');
	for (const image of expImages) {
		image.style.visibility = 'hidden';
	}
	document.getElementById('nextTrialScreen').style.visibility = 'hidden';

	//wait blankDuration
	crossDuration = parseFloat(sessionStorage.getItem('crossDuration'));
	setTimeout(() => {
		playSound('mainSound');
		waitScreen.style.visibility = 'hidden';
		showMain(allData[currentExperiment]);
		setTimeout(() => {
			clickOnMain();
		}, crossDuration); 

		// Use this code if you want to display the options by clicking on the main image
		// mainImageLink = document.getElementById('mainImageLink');
		// mainImageLink.setAttribute('onclick', 'clickOnMain();')
	}, crossDuration);
	
}

function clickOnMain () {
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
		// show choices and play sound
		logMain(currentExperiment);
		playSound("choiceSound");
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
		image.setAttribute('onclick', 'logChoice(currentExperiment, ' + correct + ', ' + index + '); nextTrial();');
	}

}

function nextTrial () {
	currentExperiment++;
	if (currentExperiment > allDataLength - 1) {
		displayEnd([]);
	} else {
		nextTrialScreen = document.getElementById('nextTrialScreen');
		nextTrialScreen.style.visibility = 'visible';
		nextTrialButton = document.getElementById('nextTrialButton');
		nextTrialButton.setAttribute('ondblclick', 'logStart(currentExperiment); playSound("startSound"); displayNext();');

		//hide choices
		document.getElementById("mainImageDIV").style.visibility = 'hidden';
		expImages = document.getElementsByClassName('expImageDIV');
		for (const image of expImages) {
			image.style.visibility = 'hidden';
		}
	}
}

function isDark (backgroundColor) {
	rgb = backgroundColor.replace(/[^\d,]/g, '').split(',');
	if (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2]) < 450) {
		return true;
	}
	return false;
}

function logStart (currentExperiment) {
	dataLog.push([
		'Screen 1 - start experiment',
		Date.now(),
		currentExperiment
	]);
}

function logChoice (currentExperiment, mainImagePosition, selection) {
	dataLog.push([
		'Screen 4 - select choice',
		Date.now(), 
		currentExperiment, 
		mainImagePosition, 
		selection, 
		mainImagePosition == selection
	]);	

}

function logMain (currentExperiment) {
	dataLog.push([
		'Screen 4 - display choices',
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
	mainWindow.loadFile(content);

}

function playSound (type) {
	var soundElem = document.getElementById(type);
	soundElem.play();
}


