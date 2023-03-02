//
//	Henrique B. Gravina - PU3IKE
//
// This is a copy of HamGridSquare.js from Paul Brewer KI6CQ with some modifications to be a class
// Original at: https://gist.githubusercontent.com/stephenhouser/4ad8c1878165fc7125cb547431a2bdaa/raw/44e08e82061f251cf3557a14fc5b322616daca88/HamGridSquare.js
// License:  MIT License http://opensource.org/licenses/MIT
//
//

class GridResolver {
	constructor() {}
	/* Get the latitude and longitude for a Maidenhead (grid square) Locator.
	*
	* This function takes a single string parameter that is a Maidenhead (grid
	* square) Locator. It must be 4 or 6 characters in length and of the format.
	* * 4-character: `^[A-X][A-X][0-9][0-9]$`
	* * 6-character: `^[A-X][A-X][0-9][0-9][a-x][a-x]$`
	* * 8-character: `^[A-X][A-X][0-9][0-9][a-x][a-x][0-9][0-9]$` (not supported).
	* 
	* Returns an array of floating point numbers `[latitude, longitude]`.
	*/
	latLonForGrid(grid) {
		var lat = 0.0;
		var lon = 0.0;
		
		function lat4(g){
			return 10 * (g.charCodeAt(1) - 'A'.charCodeAt(0)) + parseInt(g.charAt(3)) - 90;
		}
		
		function lon4(g){
			return 20 * (g.charCodeAt(0) - 'A'.charCodeAt(0)) + 2 * parseInt(g.charAt(2)) - 180;
		}

		if ((grid.length != 4) && (grid.length != 6)) {
			throw "grid square: grid must be 4 or 6 chars: " + grid;
		}

		if (/^[A-X][A-X][0-9][0-9]$/.test(grid)) {
			// Decode 4-character grid square
			lat = lat4(grid) + 0.5;
			lon = lon4(grid) + 1;
		} else if (/^[A-X][A-X][0-9][0-9][a-x][a-x]$/.test(grid)) {
			// Decode 6-character grid square
			lat = lat4(grid) + (1.0 / 60.0) * 2.5 * (grid.charCodeAt(5) - 'a'.charCodeAt(0) + 0.5);
			lon = lon4(grid) + (1.0 / 60.0) * 5 * (grid.charCodeAt(4) - 'a'.charCodeAt(0) + 0.5);
		} else if (/^[A-X][A-X][0-9][0-9][A-X][A-X]$/.test(grid)) {
			// Decode 6-character grid square
			let grid_low = grid.toLowerCase()
			lat = lat4(grid) + (1.0 / 60.0) * 2.5 * (grid_low.charCodeAt(5) - 'a'.charCodeAt(0) + 0.5);
			lon = lon4(grid) + (1.0 / 60.0) * 5 * (grid_low.charCodeAt(4) - 'a'.charCodeAt(0) + 0.5);
		} else {
			throw "gridSquareToLatLon: invalid grid: " + grid;
		}

		return [lat, lon];
	};

	/* Get the latitude and longitude for a Maidenhead (grid square) Locator.
	*
	* This function takes a single string parameter that is a Maidenhead (grid
	* square) Locator. It must be 4 or 6 characters in length and of the format.
	* * 4-character: `^[A-X][A-X][0-9][0-9]$`
	* * 6-character: `^[A-X][A-X][0-9][0-9][a-x][a-x]$`
	* * 8-character: `^[A-X][A-X][0-9][0-9][a-x][a-x][0-9][0-9]$` (not supported).
	* 
	* Returns an object based of the same type as the second parameter
	* * array of floating point numbers `[latitude, longitude]` (default return format)
	* * an object with `lat` and `lon` values if the second parameter is of type `object`
	* * a `LatLon` object if...
	*/
	gridSquareToLatLon(grid, obj) {
		var returnLatLonConstructor = (typeof (LatLon) === 'function');
		var returnObj = (typeof (obj) === 'object');

		var [lat, lon] = latLonForGrid(grid);

		if (returnLatLonConstructor) {
			return new LatLon(lat, lon);
		}

		if (returnObj) {
			obj.lat = lat;
			obj.lon = lon;
			return obj;
		}

		return [lat, lon];
	}
}

module.exports ={ GridResolver } 

