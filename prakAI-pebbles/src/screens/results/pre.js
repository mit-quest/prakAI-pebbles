console.log("begin results/pre.js");

function returnToConfig() {

	const { getCurrentWindow, app, dialog } = require('electron').remote;
	const path = require('path');
	const fs = require('fs');

	//save data
	options = {
		title: "Save Data Log",
		defaultPath : Date.now() + '.json',
		buttonLabel : "Save",

		filters :[
		  {name: 'json', extensions: ['json']}
		 ]
	 };

	console.log('open save');
	userInput = dialog.showSaveDialogSync( options );
	dataLog = sessionStorage.getItem("dataLog");
	console.log(userInput);
	if (userInput !== undefined) {
		console.log(userInput);
		fs.writeFileSync(userInput, JSON.stringify(dataLog), 'utf-8');
	}
	console.log('end save');

	//start screen 
	let mainWindow = getCurrentWindow();
	mainWindow.setMenuBarVisibility(true);
	mainWindow.setFullScreen(false);
	let content = path.join(app.getAppPath(), 'src', 'screens', 'config', 'index.html');
	//mainWindow.loadURL(content);

}
