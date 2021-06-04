console.log("begin experiment/pre.js");

const path = require('path');

let metadata = JSON.parse(sessionStorage.getItem("metadata"));
let allData = metadata["allData"];
let allDataLength = Object.keys(allData).length;

let currentExperiment = -1;
let dataLog = [];

let showImages = require('../../scripts/showImages.js');
let showMain = showImages.functions.showMain;

let setAppBackground = showImages.functions.setAppBackground;
let refreshStyling = showImages.functions.refreshStyling;

function displayNext () {

	currentTrial++;
	document.getElementById('currentTrial').innerHTML = currentTrial;

	//show a cross before displaying the image
	waitScreen = document.getElementById('waitscreen');
	//invert color of the cross if the app background is dark
	if (isDark(document.body.style.backgroundColor)) {
		document.getElementById('cross').style.filter="invert(100%)";
	}
	waitScreen.style.visibility = 'visible';

	//hide image options
	document.getElementById("mainImageDIV").style.visibility = 'hidden';
	expImages = document.getElementsByClassName('expImageDIV');
	for (const image of expImages) {
		image.style.visibility = 'hidden';
	}

	// hide nextTrialScreen
	document.getElementById('nextTrialScreen').style.visibility = 'hidden';

	//wait blankDuration
	crossDuration = parseFloat(metadata['configData']['crossDuration']);
	mainImageDuration = parseFloat(metadata['configData']['mainImageDuration']);
	setTimeout(() => {
		// playSound('mainSound');
		waitScreen.style.visibility = 'hidden';
		showMain(allData[currentExperiment]);
		dataLog.push(['Screen 2 - show main image', Date.now()]);	
		setTimeout(() => {
			clickOnMain();
		}, mainImageDuration); 

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
	noiseDIV.style.width = '100%';
	noiseDIV.style.height = '100%';
	noiseDIV.style.zIndex = '5';
	noiseDIV.class = '';
	noiseDIV.innerHTML = '<img style="width: 100%; height: 100%;" src="../../images/noise.gif" alt="">';

	targetElement = document.body;
	targetElement.appendChild(noiseDIV);

	noiseDuration = parseFloat(metadata['configData']['noiseDuration']);
	// wait 2 seconds
	setTimeout(() => {
		//kill noise
		noiseDIV.parentNode.removeChild(noiseDIV);
		// show choices and play sound
		logMain(currentExperiment);
		// playSound("choiceSound");
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
		playSound('choiceSound');
		nextTrialScreen = document.getElementById('nextTrialScreen');
		nextTrialScreen.style.visibility = 'visible';
		nextButton = document.getElementById('nextButton')
		nextButton.setAttribute('ondblclick', 'logStart(currentExperiment); playSound("startSound"); displayNext();');

		document.getElementById('waitscreen').style.visibility = 'hidden';

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


