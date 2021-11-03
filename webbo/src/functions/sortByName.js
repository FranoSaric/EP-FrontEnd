/**
 * 
 * @param {array} unsortedArray 
 * @param {string} name 
 * @returns 
 */
export default function sortByName (unsortedArray, name) {
	let sortedData = unsortedArray.sort(function (a, b) {
		var nameA = a[name].toUpperCase(); // ignore upper and lowercase
		var nameB = b[name].toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		return 0;
	});
    return sortedData;
};