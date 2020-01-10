console.log("begin makeMenu.js");

exports.makeMenu = function () {
	
	const { app, Menu } = require('electron');

	const isMac = process.platform === 'darwin';

	const template = [
		// { role: 'appMenu' }
		...(isMac ? [{
			label: app.name,
			submenu: [
				{ role: 'about' },
				{ type: 'separator' },
				{ role: 'services' },
				{ type: 'separator' },
				{ role: 'hide' },
				{ role: 'hideothers' },
				{ role: 'unhide' },
				{ type: 'separator' },
				{ role: 'quit' }
			]
		}] : []),
		// { role: 'fileMenu' }
		{
			label: 'File',
			submenu: [

				{ 
					role: 'toggledevtools',
					accelerator: 'Alt+d'
				},

				{ type: 'separator' },

				{ role: 'resetzoom' },
				{ role: 'zoomin' },
				{ role: 'zoomout' },

				{ type: 'separator' },

				{ 
					role: 'quit',
					accelerator: 'Alt+x',
				}
			]
		},
		{
			label: 'About',
			submenu: [
				{
					label: 'View App on GitHub',
					click: async () => {
						const { shell } = require('electron');
						await shell.openExternal('https://github.com/mit-quest/prakAI-pebbles');
					}
				},
				{
					label: 'Electron Documentation',
					click: async () => {
						const { shell } = require('electron');
						await shell.openExternal('https://electronjs.org');
					}
				}
			]
		}
	];

	return Menu.buildFromTemplate(template);

}
