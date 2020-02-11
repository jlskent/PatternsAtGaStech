export function filterNaN(rows) {
  var filteredRows;
  filteredRows = rows.filter(function(d){
    if(isNaN(d.lat) || isNaN(d.long))  return false;
    else return true;
  });
  return filteredRows;
}
