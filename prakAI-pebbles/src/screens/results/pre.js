console.log("begin results/pre.js");

function returnToConfig() {

	const { getCurrentWindow, app } = require('electron').remote;
	const path = require('path');

	//start screen 
	let mainWindow = getCurrentWindow();
	let content = path.join(app.getAppPath(), 'src', 'screens', 'config', 'index.html');
	mainWindow.loadURL(content);

}