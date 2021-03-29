console.log('begin start/pre.js');

function startExperiment() {

	const { getCurrentWindow, app } = require('electron').remote;
	const path = require('path');

	let mainWindow = getCurrentWindow();
	let content = path.join(app.getAppPath(), 'src', 'screens', 'experiment', 'index.html');
	mainWindow.loadFile(content);

}