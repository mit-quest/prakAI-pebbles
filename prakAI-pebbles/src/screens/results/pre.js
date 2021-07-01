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
	fs.writeFileSync(resultsFilePath + '.csv', jsonToCSV(metadata));
}

function jsonToCSV(metadata) {
	var data = typeof metadata != 'object' ? JSON.parse(metadata) : metadata; //convert JSON to dictionary
	var trialSetting = data['allData'];
	var results = data['dataLog']; 
	var csv = '';
	var header = 'subject ID, experimenter ID, session ID, run ID, date, trial number,' + 
					'main image, position of matched image, position chosen, response score,' + 
					'start timestamp, main image display timestamp, display choices timestamp, select image timestamp,' + 
					'position 0, position 1, position 2, position 3, position 4, position 5, position 6, position 7,';
	csv += header + '\r\n';
	for (var i = 0; i < parseInt(data['totalTrials']); i++) {
		var line = '';
		line += data['subjectID'] + ',' + data['experimenterID'] + ',' + data['sessionID'] + ',' + data['runID'] + ',' + data['date'] + ',' + trialSetting[i]['displaySetting'] + ',';
		line += trialSetting[i]['mainImage'].split("/").pop() + ',' + results[i*4+3][3] + ',' + results[i*4+3][4] + ',' + results[i*4+3][5] + ',';
		line += results[i*4][1] + ',' + results[i*4 + 1][1] + ',' + results[i*4 + 2][1] + ',' + results[i*4 + 3][1] + ',';
		for (var j = 0; j < trialSetting[i]['images'].length; j++) {
			line += trialSetting[i]['images'][j].slice(-5,-4) + ',';
		}
		csv += line + '\r\n';
	}

	/*var header = 'Subject ID, Event, Time Stamp, Trial Number, Main Image Position, Selected Image Position, Result,';
	csv += header + '\r\n';
	for (var i = 0; i < results.length; i++) {
		var line = '';
		line += data['subjectID'] + ',';
		for (var index in results[i]) {
			line += results[i][index] + ',';
		}
		csv += line + '\r\n';
	}*/
	return csv;
}

function returnToConfig() {
	mainWindow.setMenuBarVisibility(true);
	mainWindow.setFullScreen(false);
	let content = path.join(app.getAppPath(), 'src', 'screens', 'config', 'index.html');
	mainWindow.loadFile(content);
}