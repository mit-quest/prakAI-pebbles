console.log("begin config/pre.js");

const { dialog, getCurrentWindow, getSize, app } = require('electron').remote;
const path = require('path');
const fs = require('fs');

let mainWindow = getCurrentWindow();

function loadConfigurationDirectory() {

	// get directory from user
	userInput = dialog.showOpenDialogSync({ properties: ['openDirectory'] });
	 
	if (userInput == undefined) {
		console.log('no config directory selected');
		// display error
		configDirElement = document.getElementById('config-directory');
		configDirElement.innerHTML = 'Error, please try again';
	} else {
		configDir = userInput[0];
		sessionStorage.setItem("configDir", configDir);

		// display it for user
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

		// do the same for config.json
		configData = require(path.join(configDir, "config.json"));
		sessionStorage.setItem("configData", JSON.stringify(configData));
		
	}

}

function loadUserDirectory() {
	console.log('start loadUserDirectory');

	// get folder path
	userInput = dialog.showOpenDialogSync({ properties: ['openDirectory'] });
	if (userInput == undefined) {
		console.log('no user  directory selected');
		// display error
		userDirElement = document.getElementById('user-directory');
		userDirElement.innerHTML = 'Error, please try again';
	} else {
		userDir = userInput[0];
		userDirElement = document.getElementById('user-directory');
		userDirElement.innerHTML = userDir;
		sessionStorage.setItem("userDir", userDir);
	} 	

}

function validateAndBegin() {

	allData = JSON.parse(sessionStorage.getItem("allData"));
	configData = JSON.parse(sessionStorage.getItem("configData"));
	userDir = sessionStorage.getItem("userDir");
	
	if (validDataQ(allData, configData)) {
		let mainWindow = getCurrentWindow();

		// get input fields
		if (true) {
			sessionID = document.getElementById('session-input').value;
			sessionStorage.setItem("sessionID", sessionID);

			runID = document.getElementById('run-input').value;
			sessionStorage.setItem("runID", runID);

			experimenterID = document.getElementById('experimenter-input').value;
			sessionStorage.setItem("experimenterID", experimenterID);

			subjectID = document.getElementById('subject-input').value;
			sessionStorage.setItem("subjectID", subjectID);
		}

		// read fields
		metadata = {};

		metadata['date'] = Date.now();

		metadata['userDir'] = userDir;
		metadata['userID'] = path.basename(userDir);

		metadata['totalTrials'] = sessionStorage.getItem("totalTrials");

		metadata['configDir'] = sessionStorage.getItem("configDir");
		metadata['allData'] = JSON.parse(sessionStorage.getItem("allData"));
		metadata['configData'] = JSON.parse(sessionStorage.getItem("configData"));
		
		metadata['sessionID'] = sessionStorage.getItem("sessionID");
		metadata['runID'] = sessionStorage.getItem("runID");

		metadata['experimenterID'] = sessionStorage.getItem("experimenterID");
		metadata['subjectID'] = sessionStorage.getItem("subjectID");

		// convert JSON object to string
		const data = JSON.stringify(metadata, null, 2);
		sessionStorage.setItem("metadata", JSON.stringify(metadata));

		// write it to file
		metadataFilePath = path.join(userDir, metadata['userID'] + '-' + metadata['sessionID'] + '-' + metadata['runID'] + '-metadata.json');

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

function validDataQ(allData, configData) {

	hasElementsQ = Object.keys(allData).length > 0;
	anotherTestQ = true;

	allDataValidQ = hasElementsQ && anotherTestQ;

	hasElementsQ = Object.keys(configData).length > 0;
	anotherTestQ = true;

	configDataValidQ = hasElementsQ && anotherTestQ;

	return allDataValidQ && configDataValidQ;

}

