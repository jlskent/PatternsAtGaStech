export function filterNaN(rows) {
  var filteredRows;
  filteredRows = rows.filter(function(d){
    if(isNaN(d.lat) || isNaN(d.long))  return false;
    else return true;
  });
  return filteredRows;
}

export function processDate(rows) {
	rows.forEach(row => row.Timestamp = new Date(row.Timestamp));
	return rows;
}

/*
 * selector(string): It's a css selector. '.' and '#' should be included.
 */
export function hide(selector) {
	document.querySelectorAll(selector).forEach(node => {
		node.classList.add("hidden");
	});
}
export function show(selector) {
	document.querySelectorAll(selector).forEach(node => {
		node.classList.remove("hidden");
	});
}

export function remove(selector) {
	document.querySelectorAll(selector).forEach(node => {
		node.remove();
	});
}