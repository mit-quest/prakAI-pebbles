console.log("begin results/post.js");
const path = require('path');

document.getElementById('endSound').play();
setAppBackground();

// pulls results and displays them
resultsDiv = document.getElementById('results');
dataLog = JSON.parse(sessionStorage.getItem("dataLog"));

listItems = [];
dataLog.forEach((log, index) => {
	listItems[index] = '<li>' + JSON.stringify(log) + '</li>'
});
resultsDiv.innerHTML = listItems.join("");


