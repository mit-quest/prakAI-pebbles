console.log("begin config/pre.js");

const { dialog, getCurrentWindow, app } = require('electron').remote;
const path = require('path');

function setBackgroundColor() {
	backgroundColor = sessionStorage.getItem("backgroundColor");
	previewPane = document.getElementById('preview');
	previewPane.style.backgroundColor = backgroundColor;

	settingsPreviewPane = document.getElementById('settingsPreviewPane');
	settingsPreviewPane.style.backgroundColor = backgroundColor;
}

function setFontColor() {
	fontColor = sessionStorage.getItem("fontColor");
	elems = document.getElementsByClassName('previewText');
	for (const elem of elems) {
		elem.style.color = fontColor;
	}
}

function setSize() {
	size = sessionStorage.getItem("size");
	elems = document.getElementsByClassName('testImage');
	for (const elem of elems) {
		elem.style.width = size + 'px';
	}
}

function setSpacing() {
	spacing = sessionStorage.getItem("spacing");
	elems = document.getElementsByClassName('testImageContainer');
	for (const elem of elems) {
		elem.style.marginRight = spacing + 'px';
	}
}

function displayCachedExperiment() {
	cachedExperiments = sessionStorage.getItem("allData");
	if (cachedExperiments !== null) {
		allData = JSON.parse(cachedExperiments);
		if (validDataQ(allData)) {
			resetPreview();
			targetElement = document.getElementById("preview");
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
		targetElement = document.getElementById("preview");
		displayPreview(allData, targetElement);
		
	} else {
		console.log('no config directory selected');
		resetPreview();
		noExprMessage();
	}

}

function resetPreview() {
	targetElement = document.getElementById("preview");		
	while (targetElement.lastChild) {
		targetElement.removeChild(targetElement.lastChild);
	}
}

function noExprMessage() {
	resetPreview();
	targetElement = document.getElementById("preview");	
	targetElement.innerHTML = '<p class="previewText">No experiment loaded</p>';
	setFontColor();
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

function displayPreview(allData, targetElement) {
	for (const run of allData) {
		
		if ( run["displaySetting"] == 1 ) {
			displaySetting = 'left';
		} else {
			displaySetting = 'right';
		}

		mainImage = run["mainImage"];
		images = run["images"];
		mainImagePosition = images.indexOf(mainImage);

		element = document.createElement("div");
		element.setAttribute("class", "row");

		str1 = '<div class="col-12 previewText"><p> show on ' + 
			JSON.stringify(displaySetting) + 
			' with correct match at position ' +
			JSON.stringify(mainImagePosition) +
			'</p></div>';

		str2 = 
			'<div class="col-12"><img class="previewImage" src="' + 
			mainImage + 
			'" alt=""></div>';

		imagePaths = [];
		images.forEach((image, index) => {
			imagePaths[index] = 
				'<img class="previewImage" src="' + 
				image + 
				'" alt="">'
		});

		str3 = '<div class="col-12">' + imagePaths.join("") + '</div>';

		displayString = str1 + str2 + str3;
		element.innerHTML = displayString;
		targetElement.appendChild(element);

		setBackgroundColor(sessionStorage.getItem("backgroundColor"));
		setFontColor(sessionStorage.getItem("fontColor"));

	}

}

function validDataQ(data) {

	hasElementsQ = Object.keys(data).length > 0;
	anotherTestQ = true;
	return hasElementsQ && anotherTestQ;

}


