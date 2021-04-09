console.log("begin results/pre.js");

const { getCurrentWindow, app, dialog } = require('electron').remote;
let mainWindow = getCurrentWindow();

const path = require('path');
const fs = require('fs');

let showImages = require('../../scripts/showImages.js');
let setAppBackground = showImages.functions.setAppBackground;

let metadata = JSON.parse(sessionStorage.getItem("metadata"));

function saveDataLog() {
	dataLog = JSON.parse(sessionStorage.getItem("dataLog"));
	metadata['dataLog'] = dataLog;
	resultsFilePath = path.join(metadata["userDir"], metadata['userID'] + '-' + metadata['sessionID'] + '-' + metadata['runID'] + '_results.json');
	fs.writeFileSync(resultsFilePath, JSON.stringify(metadata, null, 2));
	document.getElementById('saveLocation').innerHTML = resultsFilePath;
}

function returnToConfig() {
	mainWindow.setMenuBarVisibility(true);
	mainWindow.setFullScreen(false);
	let content = path.join(app.getAppPath(), 'src', 'screens', 'config', 'index.html');
	mainWindow.loadFile(content);
}