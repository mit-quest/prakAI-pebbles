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
	resultsFilePath = path.join(metadata["userDir"], metadata['userID'] + '-' + metadata['sessionID'] + '-' + metadata['runID'] + '_results');
	document.getElementById('saveLocation').innerHTML = resultsFilePath + '.json';
	fs.writeFileSync(resultsFilePath + '.json', JSON.stringify(metadata, null, 2));
	fs.writeFileSync(resultsFilePath + '.csv', jsonToCSV(dataLog));
}

function jsonToCSV(dataLog) {
	var array = typeof dataLog != 'object' ? JSON.parse(dataLog) : dataLog;
	var csv = '';
	var header = 'Event, Time Stamp, Trial Number, Main Image Position, Selected Image Position, Result,';
	csv += header + '\r\n';
	for (var i = 0; i < array.length; i++) {
		var line = '';
		for (var index in array[i]) {
			line += array[i][index] + ',';
		}
		csv += line + '\r\n';
	}
	return csv;
}

function returnToConfig() {
	mainWindow.setMenuBarVisibility(true);
	mainWindow.setFullScreen(false);
	let content = path.join(app.getAppPath(), 'src', 'screens', 'config', 'index.html');
	mainWindow.loadFile(content);
}