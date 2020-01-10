console.log("begin config/pre.js");

const { dialog, getCurrentWindow, getSize, app } = require('electron').remote;
const path = require('path');

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

function loadDirectoryOfExperiments() {

	// get directory from user
	userInput = dialog.showOpenDialogSync({ properties: ['openDirectory'] });
	 
	if (userInput !== undefined) {

		configDir = userInput[0];

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

		resetPreview();
		targetElement = document.getElementById("experimentPreviewList");
		displayPreview(allData, targetElement);
		
	} else {
		console.log('no config directory selected');
		resetPreview();
		noExprMessage();
	}

}

function displayPreview(allData, targetElement) {
	
	currentExperiment = -1;

	for (const experiment of allData) {
		
		currentExperiment++;

		displaySetting = '1';
		mainImage = experiment["mainImage"];
		images = experiment["images"];
		mainImagePosition = images.indexOf(mainImage);

		previewTextHTML = document.createElement('div');
		
		previewTextHTML.innerHTML = '<p>Experiment #' + 
			currentExperiment + 
			': displaySetting=' + 
			displaySetting.toString() + 
			', correct match at position #' +
			mainImagePosition.toString() +
			'.</p>';

		targetElement.appendChild(previewTextHTML);

		experimentTableHTML = document.createElement('div');
		experimentTableHTML.setAttribute('id', 'experimentTable');
		// create mainImageDIV and expImageDivs
		experimentTableHTML.innerHTML = '\
			<div id="mainImageDIV" class="" style="width: 50px;">1</div>\
			\
			<div id="expImageDIV-1" class="expImageDIV " style="width: 35px;">2</div>\
			<div id="expImageDIV-2" class="expImageDIV " style="width: 35px;">3</div>\
			<div id="expImageDIV-3" class="expImageDIV " style="width: 35px;">4</div>\
			<div id="expImageDIV-4" class="expImageDIV " style="width: 35px;">5</div>\
			<div id="expImageDIV-5" class="expImageDIV " style="width: 35px;">6</div>\
			<div id="expImageDIV-6" class="expImageDIV " style="width: 35px;">7</div>\
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
	if (validDataQ(allData)) {
		let mainWindow = getCurrentWindow();
		mainWindow.setMenuBarVisibility(false);
		mainWindow.setFullScreen(true);
		let content = path.join(app.getAppPath(), 'src', 'screens', 'start', 'index.html');
		mainWindow.loadURL(content);
	} else {
		alert("you haven't loaded a valid config directory");
	}
}

function validDataQ(data) {

	hasElementsQ = Object.keys(data).length > 0;
	anotherTestQ = true;
	return hasElementsQ && anotherTestQ;

}


