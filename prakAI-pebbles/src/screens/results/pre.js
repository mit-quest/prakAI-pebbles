console.log("begin results/pre.js");

function returnToConfig() {

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
		mainWindow.loadURL(content);
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
			mainWindow.loadURL(content);
		}
	}

}
