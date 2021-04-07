console.log("begin results/pre.js");

function returnToConfig() {

	const { getCurrentWindow, app, dialog } = require('electron').remote;
	const path = require('path');
	const fs = require('fs');

	let mainWindow = getCurrentWindow();

	experimentalDataDir = sessionStorage.getItem("experimentalDataDir");
	experimentalData = JSON.parse(sessionStorage.getItem("experimentalData"));

	dataLog = JSON.parse(sessionStorage.getItem("dataLog"));
	const data = JSON.stringify(dataLog, null, 2);

	// write it to file
	resultsFilePath = path.join(experimentalDataDir, experimentalData['user-id'] + '-' + experimentalData['session'] + '-' + experimentalData['run'] + '-results.json');

	fs.writeFileSync(resultsFilePath, data);

	mainWindow.setMenuBarVisibility(true);
	mainWindow.setFullScreen(false);
	let content = path.join(app.getAppPath(), 'src', 'screens', 'config', 'index.html');
	mainWindow.loadFile(content);

}

function returnToConfigStable() {

	const { getCurrentWindow, app, dialog } = require('electron').remote;
	const path = require('path');
	const fs = require('fs');

	let mainWindow = getCurrentWindow();

	//save data
	saveOptions = {
		title: "Save Data Log",
		defaultPath : Date.now() + '.json',
		buttonLabel : "Save",

		filters :[
		  {name: 'json', extensions: ['json']}
		 ]
	 };
	 
	userInput = dialog.showSaveDialogSync(mainWindow, saveOptions);
	dataLog = sessionStorage.getItem("dataLog");
	console.log(userInput);
	if (userInput !== undefined) {
		console.log(userInput);
		fs.writeFileSync(userInput, JSON.stringify(dataLog), 'utf-8');
		mainWindow.setMenuBarVisibility(true);
		mainWindow.setFullScreen(false);
		let content = path.join(app.getAppPath(), 'src', 'screens', 'config', 'index.html');
		mainWindow.loadFile(content);
	} else {
		messageOptions = {
			message: 'You did not save the data, are you sure you want to proceed?',
			buttons: ['discard data', 'go back and save data'],
			defaultId: 1
		};
		userInput = dialog.showMessageBoxSync(mainWindow, messageOptions);
		if (userInput == 0) {
			sessionStorage.setItem("dataLog", '');
			mainWindow.setMenuBarVisibility(true);
			mainWindow.setFullScreen(false);
			let content = path.join(app.getAppPath(), 'src', 'screens', 'config', 'index.html');
			mainWindow.loadFile(content);
		}
	}

}