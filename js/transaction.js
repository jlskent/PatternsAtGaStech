
// imports
import dataAgent from './loadData.js';
import { svg, projection } from './main.js';
const { getCreditCardTransactions, getLoyaltyCardTransactions, getListOfPlaces } = dataAgent;

//selector
var transactionSelector = d3.select(".transaction-item");
var placeSelector = d3.select("#name").append("div").attr("id", "places");
//cc
var recordsSelector = d3.select("#cc").append("div").attr("id", "records");
//lc
var recordsSelector2 = d3.select("#lc").append("div").attr("id", "records2");


//states
var currentNameOfPlace = "";
var name_ccMap = new Map();
var name_lcMap = new Map();
var showCreditCardRecords = true;
var showLoyaltyCardRecords = false;





// buttons

// looks like it is already sorted TAT
d3.select('#sort')
  .on('click', function() {
    if(currentNameOfPlace == "") return;
    var records = name_ccMap.get(currentNameOfPlace);
    records = Object.keys(records).sort(function(a,b){return records[a].timestamp-records[b].timestamp});
    showRecords(currentNameOfPlace, records);
  });





d3.select('#showCreditCardBtn')
  .on('click', function() {
    console.log("show showCreditCardBtn");
    showCreditCardRecords = true;
    showLoyaltyCardRecords = false;
    const opacity = showCreditCardRecords? 1:0;
    recordsSelector.style("opacity", opacity);

  });


d3.select('#showLoyaltyCardBtn')
  .on('click', function() {
    console.log("show showLoyaltyCardBtn");
    showCreditCardRecords = false;
    showLoyaltyCardRecords = true;
    const opacity = showLoyaltyCardRecords? 1:0;
    recordsSelector.style("opacity", opacity);
  });





Promise.all([getCreditCardTransactions(), getLoyaltyCardTransactions(), getListOfPlaces()]).then( ([cc,lc,places]) => {
  // data loaded
  const mapPromise = new Promise((resolve, reject) => {
    // compute hashmaps <place name, [transaction records of the place]>
    const map = createLocation_ccTransactionMap(cc);
    const map2 = createLocation_lcTransactionMap(lc);
    resolve([map, map2]);
  });

  mapPromise.then( maps => {
    console.log(maps[0]);
    name_ccMap = maps[0];
    name_lcMap = maps[1];
    drawList(places);
  })
});







//util to populate map
function createLocation_lcTransactionMap(lc) {
  const map = new Map();
  lc.forEach(row => {
    const placeNameOfaRow = row['location'];
    const arrayOfRecords = map.has(placeNameOfaRow)? map.get(placeNameOfaRow) : [];
    arrayOfRecords.push(row);
    map.set(placeNameOfaRow, arrayOfRecords);
  });
  return map;
}



function createLocation_ccTransactionMap(cc) {
  const map = new Map();
  cc.forEach(row => {
    const placeNameOfaRow = row['location'];
    // console.log(placeNameOfaRow);
    const arrayOfRecords = map.has(placeNameOfaRow)? map.get(placeNameOfaRow) : [];
    arrayOfRecords.push(row);
    map.set(placeNameOfaRow, arrayOfRecords);
  });
  return map;
}






function drawList(data) {
  console.log(data);
  d3.select("#transactions").remove();
  placeSelector.append("h4").text("Places of Transaction");

  var ul =
  placeSelector
    .append("ul")
    .attr("id", "listOfPlaces")
    .attr("class", "list-group")
    .selectAll("li")
    .data(data)
    .enter()
    .append("li")
    .text(
      (d, i) => {  return d;  }
    )
    .attr("class", "list-group-item")
    .on('click', (nameOfPlace, i) => {
      currentNameOfPlace = nameOfPlace;
      showRecords(nameOfPlace, name_ccMap.get(nameOfPlace), recordsSelector);
      showRecords(nameOfPlace, name_lcMap.get(nameOfPlace) ,recordsSelector2);
      showOnMap(nameOfPlace); // not yet implemented
      console.log(nameOfPlace);
    })

  ;


}






function showRecords(placeName, records, selector) {
  // clean up old

  selector.selectAll("*").remove();
  selector.append("h4").text("Transaction record");
  selector
    .append("ul")
    .attr("class", "list-group")
    .selectAll("li")
    .data(records)
    .enter()
    .append("li")
    .text((d, i) => {
      const fullName = d.FirstName + " " + d.LastName;
      return fullName + ", " + d.timestamp;
    })
    .attr("class", "list-group-item")
}





function showOnMap(place){

}