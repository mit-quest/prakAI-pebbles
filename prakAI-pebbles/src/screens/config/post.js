console.log("begin config/post.js");

resetPreview();
displayCachedExperiment();
sessionStorage.setItem("allData", '[]');

backgroundColorPicker = document.getElementById('backgroundColorPicker');
backgroundColor = backgroundColorPicker.value;
sessionStorage.setItem("backgroundColor", backgroundColor);
setBackgroundColor();

backgroundColorPicker.onchange = function(ev) {
	sessionStorage.setItem("backgroundColor", ev.target.value);
	setBackgroundColor(ev.target.value);
};

fontColorPicker = document.getElementById('fontColorPicker');
fontColor = fontColorPicker.value;
sessionStorage.setItem("fontColor", fontColor);
setFontColor();

fontColorPicker.onchange = function(ev) {
	sessionStorage.setItem("fontColor", ev.target.value);
	setFontColor(ev.target.value);
};

sizePicker = document.getElementById('sizePicker');
size = sizePicker.value;
sessionStorage.setItem("size", size);
setSize();

sizePicker.oninput = function(ev) {
	sessionStorage.setItem("size", ev.target.value);
	setSize(ev.target.value);
} 

spacingPicker = document.getElementById('spacingPicker');
spacing = spacingPicker.value;
sessionStorage.setItem("spacing", spacing);
setSpacing();

spacingPicker.oninput = function(ev) {
  sessionStorage.setItem("spacing", ev.target.value);
  setSpacing(ev.target.value);
} 









