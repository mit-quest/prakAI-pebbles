let displays = {};

displays.display1 = function () {

	experimentTable = document.getElementById('experimentTable');

	experimentTable.innerHTML = 
		'\
			<tr>\
				<td id="mainImageTD"  width="200px"></td>\
				<td width="400px">\
					<table>\
						<tr>\
							<td id="expImageTD-1" class="expImageTD" width="100px"></td>\
							<td id="expImageTD-2" class="expImageTD" width="100px"></td>\
							<td id="expImageTD-3" class="expImageTD" width="100px"></td>\
						</tr>\
						<tr>\
							<td id="expImageTD-4" class="expImageTD" ></td>\
							<td id="expImageTD-5" class="expImageTD" ></td>\
							<td id="expImageTD-6" class="expImageTD" ></td>\
						</tr>\
					</table>\
				</td>\
			</tr>\
		';
};


displays.display2 = function () {

	experimentTable = document.getElementById('experimentTable');

	experimentTable.innerHTML = 
		'\
			<tr>\
				<td width="400px">\
					<table>\
						<tr>\
							<td id="expImageTD-1" class="expImageTD" width="100px"></td>\
							<td id="expImageTD-2" class="expImageTD" width="100px"></td>\
							<td id="expImageTD-3" class="expImageTD" width="100px"></td>\
						</tr>\
						<tr>\
							<td id="expImageTD-4" class="expImageTD" ></td>\
							<td id="expImageTD-5" class="expImageTD" ></td>\
							<td id="expImageTD-6" class="expImageTD" ></td>\
						</tr>\
					</table>\
				</td>\
				<td id="mainImageTD"  width="200px"></td>\
			</tr>\
		';
};

exports.templates = displays;