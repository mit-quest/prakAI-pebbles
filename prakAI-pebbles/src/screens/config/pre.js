console.log("begin config/pre.js");

const { dialog, getCurrentWindow, app } = require('electron').remote;
const path = require('path');

function displayCachedExperiment() {
	cachedExperiments = sessionStorage.getItem("allData");
	if (cachedExperiments !== null) {
		allData = JSON.parse(cachedExperiments);
		if (validDataQ(allData)) {
			targetElement = document.getElementById("preview");	
			displayPreview(allData, targetElement);
		}
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

		targetElement = document.getElementById("preview");
		displayPreview(allData, targetElement);
		
	} else {

		console.log('no config directory selected');

		targetElement = document.getElementById("preview");		
		while (targetElement.lastChild) {
			targetElement.removeChild(targetElement.lastChild);
		}

	}

}


function validateAndBegin() {
	allData = JSON.parse(sessionStorage.getItem("allData"));
	if (validDataQ(allData)) {
		let mainWindow = getCurrentWindow();
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

		str1 = '<div class="col-12"><p> show on ' + 
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

	}

}

function validDataQ(data) {

	hasElementsQ = Object.keys(data).length > 0;
	anotherTestQ = true;
	return hasElementsQ && anotherTestQ;

}

