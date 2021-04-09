console.log('begin start/post.js');

let showImages = require('../../scripts/showImages.js');
let setAppBackground = showImages.functions.setAppBackground;
let refreshStyling = showImages.functions.refreshStyling;

metadata = JSON.parse(sessionStorage.getItem("metadata"));

instructionsElement = document.getElementById('instructions');
instructionsElement.innerHTML = metadata['configData']['initialInstructions'];

setAppBackground();
refreshStyling();

