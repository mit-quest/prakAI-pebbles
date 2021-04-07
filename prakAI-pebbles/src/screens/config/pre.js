console.log("begin config/pre.js");

const { dialog, getCurrentWindow, getSize, app } = require('electron').remote;
const path = require('path');
const fs = require('fs');

let mainWindow = getCurrentWindow();

let leftDiv, rightDiv;
let mainContent, choicesContent;

let showImages = require('../../scripts/showImages.js');
let showMain = showImages.functions.showMain;
let showChoices = showImages.functions.showChoices;
let refreshStyling = showImages.functions.refreshStyling;

function displayCachedExperiment() {
	cachedExperiments = sessionStorage.getItem("allData");
	if (cachedExperiments !== null) {
		allData = JSON.parse(cachedExperiments);
		if (validDataQ(allData)) {
			resetPreview();
			targetElement = document.getElementById('experimentPreviewList');
			displayPreview(allData, targetElement);
		}
	} else {
		noExprMessage();
	}
	
}

function loadConfigurationDirectory() {

	// get directory from user
	userInput = dialog.showOpenDialogSync({ properties: ['openDirectory'] });
	 
	if (userInput !== undefined) {

		configDir = userInput[0];

		configDirElement = document.getElementById('config-directory');
		configDirElement.innerHTML = configDir;

		// load allData
		allData = require(path.join(configDir, "sequence.json"));

		// replace image names with full local paths
		allData.forEach ((data, index, arrayPointer) => {

			fullPath = path.join(configDir, "images", data["mainImage"]);
			arrayPointer[index]["mainImage"] = fullPath;

			allImages = arrayPointer[index]["images"];
			allImages.forEach ((innerData, innerIndex)=>{
				fullPath = path.join(configDir, "images", innerData);
				arrayPointer[index]["images"][innerIndex] = fullPath;
			})

		})
		console.log("allData loaded");
		console.log(allData);

		// Save into session storage
		sessionStorage.setItem("allData", JSON.stringify(allData));

		totalTrials = allData.length;
		sessionStorage.setItem("totalTrials", totalTrials);

		resetPreview();
		targetElement = document.getElementById("experimentPreviewList");
		displayPreview(allData, targetElement);
		
	} else {
		console.log('no config directory selected');
		resetPreview();
		noExprMessage();
	}

}

function loadUserDirectory() {
	console.log('start loadExperimentalDataDirectory');

	// get folder path
	userInput = dialog.showOpenDialogSync({ properties: ['openDirectory'] });
	if (userInput !== undefined) {
		experimentalDataDir = userInput[0];
		experimentalDataDirElement = document.getElementById('experimental-data-directory');
		experimentalDataDirElement.innerHTML = experimentalDataDir;
		sessionStorage.setItem("experimentalDataDir", experimentalDataDir);
	} 	

}

function createExperimentalDataDirectoryDialog() {
	console.log('show dialog');
	document.getElementById('password-dialog').classList.remove('d-none');
	document.getElementById('config-head').classList.add('d-none');
	document.getElementById('config-body').classList.add('d-none');
}

function submitPassword(event) {

	console.log('create experiment');
	event.preventDefault();

	experimentalData = {};
	experimentalData['session'] = document.getElementById('session-input').value;
	experimentalData['run'] = document.getElementById('run-input').value;
	sessionStorage.setItem("experimentalData", JSON.stringify(experimentalData));

	configDir = document.getElementById('config-directory').innerHTML;
	document.getElementById('configDir-input').value = configDir;
	experimentalData['configDir'] = configDir;
	sessionStorage.setItem("experimentalData", JSON.stringify(experimentalData));

	document.getElementById('password-dialog').classList.add('d-none');
	document.getElementById('config-head').classList.remove('d-none');
	document.getElementById('config-body').classList.remove('d-none');

	console.log('create before loading');

	saveOptions = {
		title: "Create Experimental Data",
		buttonLabel : "Select User Directory",
		properties: ['openDirectory']
	 };

	userInput = dialog.showOpenDialogSync(mainWindow, saveOptions);

	if (userInput !== undefined) {

		userDir = userInput[0];
		experimentalData['user-id'] = path.basename(userInput[0]);
		sessionStorage.setItem("experimentalData", JSON.stringify(experimentalData));

		// create data dir
		dir = path.join(userDir);
		experimentalDataDirElement = document.getElementById('experimental-data-directory');
		experimentalDataDirElement.innerHTML = dir;

		fs.mkdirSync(dir, { recursive: true });

		// convert JSON object to string
		const data = JSON.stringify(experimentalData, null, 2);

		// write it to file
		metadataFilePath = path.join(dir, experimentalData['user-id'] + '-' + experimentalData['session'] + '-' + experimentalData['run'] + '-metadata.json');

		if (fs.existsSync(metadataFilePath)) {
			messageOptions = {
				message: 'You are about to overwrite results, are you sure?',
				buttons: ['Overwrite results', 'Cancel'],
				defaultId: 2
			};
			userInput = dialog.showMessageBoxSync(mainWindow, messageOptions);
			if (userInput == 0) {
				fs.writeFileSync(metadataFilePath, data);
			}
		} else {
			fs.writeFileSync(metadataFilePath, data);
		}
		
		// this throws a json parse error when it tries to read it in, but it can read in after if I run it manually, 
		// I suspect this does not finish writing when it then tries to load it
		loadExperimentalDataDirectory(false);

	} 

}

function loadExperimentalDataDirectory(interactive) {
	console.log('start loadExperimentalDataDirectory');

	// get directory from user
	if (interactive == true) {
		userInput = dialog.showOpenDialogSync({ properties: ['openDirectory'] });
		if (userInput !== undefined) {
			experimentalDataDir = userInput[0];
			experimentalDataDirElement = document.getElementById('experimental-data-directory');
			experimentalDataDirElement.innerHTML = experimentalDataDir;
			sessionStorage.setItem("experimentalDataDir", experimentalDataDir);
			experimentalData = require(path.join(experimentalDataDir, "metadata.json"));
		} else {
			console.log('no experimental data directory selected');
			resetPreview();
			noExprMessage();
			experimentalDataDir = 'failure';
		}
	} else {
		experimentalDataDir = document.getElementById('experimental-data-directory').innerHTML;
		experimentalData = JSON.parse(sessionStorage.getItem("experimentalData"));
	}
	
	if (experimentalDataDir == 'failure') {
		console.log('experimental data directory does not exist');
		resetPreview();
	} else {
		document.getElementById('user-id').innerHTML = experimentalData['user-id'];
		document.getElementById('session').innerHTML = experimentalData['session'];
		document.getElementById('run').innerHTML = experimentalData['run'];
	}
	

}

function displayPreview(allData, targetElement) {
	
	currentExperiment = -1;

	for (const experiment of allData) {
		
		currentExperiment++;

		displaySetting = '1';
		mainImage = experiment["mainImage"];
		images = experiment["images"];
		mainImagePosition = images.indexOf(mainImage) + 1;

		previewTextHTML = document.createElement('div');
		
		previewTextHTML.innerHTML = '<div class="col-12"><p>Experiment #' + 
			currentExperiment + 
			': displaySetting=' + 
			displaySetting.toString() + 
			', correct match at position #' +
			mainImagePosition.toString() +
			'.</p></div>';

		targetElement.appendChild(previewTextHTML);

		experimentTableHTML = document.createElement('div');
		experimentTableHTML.setAttribute('id', 'experimentTable');
		experimentTableHTML.setAttribute('class', 'col-12 row');
		// create mainImageDIV and expImageDivs
		experimentTableHTML.innerHTML = '\
			<div class="col-2">main</div>\
			\
			<div class="col-1">1</div>\
			<div class="col-1">2</div>\
			<div class="col-1">3</div>\
			<div class="col-1">4</div>\
			<div class="col-1">5</div>\
			<div class="col-1">6</div>\
			<div class="col-1">7</div>\
			<div class="col-1">8</div>\
			<div class="col-3"></div>\
		';
		targetElement.appendChild(experimentTableHTML);
		
		experimentTableHTML = document.createElement('div');
		experimentTableHTML.setAttribute('id', 'experimentTable');
		experimentTableHTML.setAttribute('class', 'col-12 row');
		// create mainImageDIV and expImageDivs
		experimentTableHTML.innerHTML = '\
			<div id="mainImageDIV" class="col-2 main-preview-image">1</div>\
			\
			<div id="expImageDIV-1" class="col-1 expImageDIV preview-image">2</div>\
			<div id="expImageDIV-2" class="col-1 expImageDIV preview-image">3</div>\
			<div id="expImageDIV-3" class="col-1 expImageDIV preview-image">4</div>\
			<div id="expImageDIV-4" class="col-1 expImageDIV preview-image">5</div>\
			<div id="expImageDIV-5" class="col-1 expImageDIV preview-image">6</div>\
			<div id="expImageDIV-6" class="col-1 expImageDIV preview-image">7</div>\
			<div id="expImageDIV-7" class="col-1 expImageDIV preview-image">8</div>\
			<div id="expImageDIV-8" class="col-1 expImageDIV preview-image">9</div>\
			<div class="col-3"></div>\
		';
		targetElement.appendChild(experimentTableHTML);

		showMain(experiment);
		// show choices
		expImages = document.getElementsByClassName('expImageDIV');
		for (const image of expImages) {
			image.style.visibility = 'visible';
		}

		experimentTableHTML.setAttribute('id', '');
		mainImageHTML = document.getElementById('mainImageDIV');
		mainImageHTML.setAttribute('id', '');	
		expImages = document.getElementsByClassName('expImageDIV');
		for (const elem of expImages) {
			elem.setAttribute('id', '');
		}

	}

}

function resetPreview() {
	targetElement = document.getElementById("experimentPreviewList");		
	while (targetElement.lastChild) {
		targetElement.removeChild(targetElement.lastChild);
	}
}

function noExprMessage() {
	resetPreview();
	targetElement = document.getElementById("experimentPreviewList");	
	targetElement.innerHTML = '<p class="previewText">No experiment loaded</p>';
	refreshStyling();
}

function validateAndBegin() {

	allData = JSON.parse(sessionStorage.getItem("allData"));
	experimentalDataDir = sessionStorage.getItem("experimentalDataDir");
	
	if (validDataQ(allData)) {
		let mainWindow = getCurrentWindow();

		crossDurationPicker = document.getElementById('cross-duration-picker');
		crossDuration = crossDurationPicker.value;
		sessionStorage.setItem("crossDuration", crossDuration);

		mainImageDurationPicker = document.getElementById('main-image-duration-picker');
		mainImageDuration = mainImageDurationPicker.value;
		sessionStorage.setItem("mainImageDuration", mainImageDuration);

		noiseDurationPicker = document.getElementById('noise-duration-picker');
		noiseDuration = noiseDurationPicker.value;
		sessionStorage.setItem("noiseDuration", noiseDuration);

		backgroundColorPicker = document.getElementById('background-color-picker');
		backgroundColor = backgroundColorPicker.value;
		sessionStorage.setItem("backgroundColor", backgroundColor);

		fontColorPicker = document.getElementById('font-color-picker');
		fontColor = fontColorPicker.value;
		sessionStorage.setItem("fontColor", fontColor);

		imageSizePicker = document.getElementById('image-size-picker');
		imageSize = imageSizePicker.value;
		sessionStorage.setItem("imageSize", imageSize);

		layoutRadiusPicker = document.getElementById('layout-radius-picker');
		layoutRadius = layoutRadiusPicker.value;
		sessionStorage.setItem("layoutRadius", layoutRadius);

		// CREATE FOLDERS AND FILES
		fs.mkdirSync(experimentalDataDir, { recursive: true });

		// read fields
		experimentalData = {};
		
		experimentalData['experimentalDataDir'] = document.getElementById('experimental-data-directory').innerHTML;
		experimentalData['user-id'] = path.basename(experimentalData['experimentalDataDir']);
		experimentalData['session'] = document.getElementById('session-input').value;
		experimentalData['run'] = document.getElementById('run-input').value;

		experimentalData['configDir'] = document.getElementById('config-directory').innerHTML;
		experimentalData['allData'] = allData;

		// convert JSON object to string
		sessionStorage.setItem("experimentalData", JSON.stringify(experimentalData));
		const data = JSON.stringify(experimentalData, null, 2);

		// write it to file
		metadataFilePath = path.join(experimentalDataDir, experimentalData['user-id'] + '-' + experimentalData['session'] + '-' + experimentalData['run'] + '-metadata.json');

		if (fs.existsSync(metadataFilePath)) {
			messageOptions = {
				message: 'You are about to overwrite results, are you sure?',
				buttons: ['Overwrite results', 'Cancel'],
				defaultId: 2
			};
			userInput = dialog.showMessageBoxSync(mainWindow, messageOptions);
			if (userInput == 1) {
				return;
			}
		} 

		fs.writeFileSync(metadataFilePath, data);
		// START APP
		
		mainWindow.setMenuBarVisibility(false);
		mainWindow.setFullScreen(true);
		let content = path.join(app.getAppPath(), 'src', 'screens', 'start', 'index.html');
		mainWindow.loadFile(content);
		
		
	} else {
		alert("you haven't loaded a valid config directory");
	}
}

function validDataQ(data) {

	hasElementsQ = Object.keys(data).length > 0;
	anotherTestQ = true;
	return hasElementsQ && anotherTestQ;

}


