console.log("begin experiment/pre.js");

let allData = JSON.parse(sessionStorage.getItem("allData"));
let allDataLength = Object.keys(allData).length;

let currentExperiment = -1;
let dataLog = [];

let displaySetting, mainImage, images, mainImagePosition;
let leftDiv, rightDiv;
let mainContent, choicesContent;

function displayNext() {

	currentExperiment++;

	if (currentExperiment > allDataLength - 1) {

		displayEnd([]);

	} else {

		displaySetting = allData[currentExperiment]["displaySetting"];
		mainImage = allData[currentExperiment]["mainImage"];
		images = allData[currentExperiment]["images"];
		mainImagePosition = images.indexOf(mainImage);
		display();

	}

}

function display() {

	playSound('mainSound');

	// clear left div
	leftDiv = document.getElementById('left');
	while (leftDiv.lastChild) {
		leftDiv.removeChild(leftDiv.lastChild);
	}
	leftDiv.setAttribute("class", "");

	//clear right div
	rightDiv = document.getElementById('right');
	while (rightDiv.lastChild) {
		rightDiv.removeChild(rightDiv.lastChild);
	}
	rightDiv.setAttribute("class", "");

	// compute main content, displayed in this function later
	mainContent = document.createElement("DIV");
	mainContent.setAttribute("class", "row ");

	mainContentString = '\
		<div class="col-12">\
			<a href="#" onclick="logMain();showChoices();">\
				<img src="' + mainImage + '" class="mainImage">\
			</a>\
		</div>\
	';

	mainContent.innerHTML = mainContentString;

	//compute choice div, but only displayed on showChoices()
	choicesContent = document.createElement("DIV");
	choicesContent.setAttribute("class", "row");

	imagePaths = [];
	images.forEach((image, index) => {
		imagePaths[index] = '\
			<div class="col-4">\
				<a href="#" onclick="logChoice(' + index + ');displayNext();">\
					<img src="' + image + '" class="choiceImage">\
				</a>\
			</div>\
		';
	});

	choicesContent.innerHTML = imagePaths.join("");

	// prepare layout and display mainContent
	if (displaySetting == 1) {
		leftDiv.setAttribute("class", "col-3");
		leftDiv.appendChild(mainContent);
		rightDiv.setAttribute("class", "col-9");
	} else {
		leftDiv.setAttribute("class", "col-9");
		rightDiv.setAttribute("class", "col-3");
		rightDiv.appendChild(mainContent);
	}

}

function showChoices() {

	playSound('choiceSound');

	if (displaySetting == 1) {

		rightDiv.appendChild(choicesContent);

	} else {

		leftDiv.appendChild(choicesContent);

	}

}

function logChoice(selection) {

	dataLog.push([
		'choice',
		Date.now(), 
		currentExperiment, 
		mainImagePosition, 
		selection, 
		mainImagePosition == selection
	]);	

}

function logMain() {

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


