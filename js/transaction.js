
// imports
import dataAgent from './loadData.js';
import { svg, projection } from './main.js';
const { getCreditCardTransactions, getLoyaltyCardTransactions, getListOfPlaces, getListOfPeople } = dataAgent;

//selector
var parent = d3.select(".transaction-item");
var transactionSelector = parent.append("div");
var chartSelector = d3.select("#name").append("div").attr("id", "places");










// canvas for scatter plot
var margin = {top: 20, right: 20, bottom: 100, left: 40},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;


var chart = d3.select("#records").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const row = d3.select("#records").append('div').attr('class', 'row').attr('id', 'recordDetail');
row.append('div').attr('id', 'cc').attr('class', 'col-6');
row.append('div').attr('id', 'lc').attr('class', 'col-6');

//cc
var recordsSelector = d3.select("#cc").append("div").attr("id", "records1");
//lc
var recordsSelector2 = d3.select("#lc").append("div").attr("id", "records2");

const COLOR = {
  BLUE: "blue",
  RED: "red",
  GREEN: "green",
};




// end of canvas




//states to
var currentNameOfPlace = "";
var name_ccMap = new Map();
var name_lcMap = new Map();
var showCreditCardRecords = true;
var showLoyaltyCardRecords = false;

var currentPerson = "Cornelia Lais";
var currentWeek = "week1";
var allTransactionsOfEachPerson = new Map();
var allPlaces = [];



// buttons not using currently

// looks like it is already sorted TAT
d3.select('#sort')
  .on('click', function() {
    if(currentNameOfPlace == "") return;
    var records = name_ccMap.get(currentNameOfPlace);
    records = Object.keys(records).sort(function(a,b){return records[a].timestamp-records[b].timestamp});
    showRecords(currentNameOfPlace, records);
  });








// looks like it is already sorted TAT
d3.select('#sort')
  .on('click', function() {
    if(currentNameOfPlace == "") return;
    var records = name_ccMap.get(currentNameOfPlace);
    records = Object.keys(records).sort(function(a,b){return records[a].timestamp-records[b].timestamp});
    showRecords(currentNameOfPlace, records);
  });








// TODO get weekly sum
// given state map of <location, [records]> loaded, query for specific person and compute sum
function getSumOfPerson (firstName, lastName, locationList){
  // console.log(name_ccMap)

  const res = new Map();
  locationList.forEach(location => {

    //console.log(location);
    const creditRecordsPerLocation = name_ccMap.has(location)? name_ccMap.get(location) : [];
    const loyaltyRecordsPerLocation = name_lcMap.has(location)? name_lcMap.get(location): [];

    //console.log(loyaltyRecordsPerLocation);
    const creditRecordsPerLocationPerson = creditRecordsPerLocation.filter(row => {return row.FirstName === firstName && row.LastName === lastName});
    const loyaltyRecordsPerLocationPerson = loyaltyRecordsPerLocation.filter(row => {return row.FirstName === firstName && row.LastName === lastName});

    //WK1
    const creditRecordsPerLocationPersonWk1 = creditRecordsPerLocationPerson.filter(row => {
      return row.timestamp >= "1/06/2014"  && row.timestamp <= "1/12/2014 ";
    });

    const loyaltyRecordsPerLocationPersonWk1 = loyaltyRecordsPerLocationPerson.filter(row => {
      return row.timestamp >= "1/06/2014"  && row.timestamp <= "1/12/2014 ";
    });

    var sumCreditCardWk1 = creditRecordsPerLocationPersonWk1.reduce((a, {price}) => a + parseFloat(price), 0);
    var sumLoyaltyCardWk1 = loyaltyRecordsPerLocationPersonWk1.reduce((a, {price}) => a + parseFloat(price), 0);
    var sumWk1 = sumCreditCardWk1 + sumLoyaltyCardWk1;
    const sumListWk1 = [sumCreditCardWk1, sumLoyaltyCardWk1, sumWk1];


    //WK2
    const creditRecordsPerLocationPersonWk2 = creditRecordsPerLocationPerson.filter(row => {
      return row.timestamp >= "1/13/2014"  && row.timestamp <= "1/19/2014 ";
    });

    const loyaltyRecordsPerLocationPersonWk2 = loyaltyRecordsPerLocationPerson.filter(row => {
      return row.timestamp >= "1/13/2014"  && row.timestamp <= "1/19/2014 ";
    });


    var sumCreditCardWk2 = creditRecordsPerLocationPersonWk2.reduce((a, {price}) => a + parseFloat(price), 0);
    var sumLoyaltyCardWk2 = loyaltyRecordsPerLocationPersonWk2.reduce((a, {price}) => a + parseFloat(price), 0);
    var sumWk2 = sumCreditCardWk2 + sumLoyaltyCardWk2;
    const sumListWk2 = [sumCreditCardWk2, sumLoyaltyCardWk2, sumWk2];


    //WK3
    const creditRecordsPerLocationPersonWk3 = creditRecordsPerLocationPerson.filter(row => {
      return row.timestamp >= "1/20/2014"  && row.timestamp <= "1/26/2014 ";
    });

    const loyaltyRecordsPerLocationPersonWk3 = loyaltyRecordsPerLocationPerson.filter(row => {
      return row.timestamp >= "1/20/2014"  && row.timestamp <= "1/26/2014 ";
    });

    var sumCreditCardWk3 = creditRecordsPerLocationPersonWk3.reduce((a, {price}) => a + parseFloat(price), 0);
    var sumLoyaltyCardWk3 = loyaltyRecordsPerLocationPersonWk3.reduce((a, {price}) => a + parseFloat(price), 0);
    var sumWk3 = sumCreditCardWk3 + sumLoyaltyCardWk3;
    const sumListWk3 = [sumCreditCardWk3, sumLoyaltyCardWk3, sumWk3];


    //console.log(personFiltered);
    // var sumCreditCard = creditRecordsPerLocationPerson.reduce((a, {price}) => a + parseFloat(price), 0);
    // var sumLoyaltyCard = loyaltyRecordsPerLocationPerson.reduce((a, {price}) => a + parseFloat(price), 0);
    // const paymentList = [sumCreditCard, sumLoyaltyCard, sumCreditCard + sumLoyaltyCard];
    res.set(location, {
      'week1': sumListWk1,
      'week2': sumListWk2,
      'week3': sumListWk3,
    });

  });
  //console.log(res);
  return res;
}



// TODO get weekly sum
// given state map of <location, [records]> loaded, query for specific person and compute sum
// function getSumOfPerson (firstName, lastName, locationList){
//   // console.log(name_ccMap)
//
//   const res = new Map();
//   locationList.forEach(location => {
//
//     //console.log(location);
//     const creditRecordsPerLocation = name_ccMap.has(location)? name_ccMap.get(location) : [];
//     const loyaltyRecordsPerLocation = name_lcMap.has(location)? name_lcMap.get(location): [];
//
//     //console.log(loyaltyRecordsPerLocation);
//     const creditRecordsPerLocationPerson = creditRecordsPerLocation.filter(row => {return row.FirstName === firstName && row.LastName === lastName});
//     const loyaltyRecordsPerLocationPerson = loyaltyRecordsPerLocation.filter(row => {return row.FirstName === firstName && row.LastName === lastName});
//
//     //console.log(personFiltered);
//     var sumCreditCard = creditRecordsPerLocationPerson.reduce((a, {price}) => a + parseFloat(price), 0);
//     var sumLoyaltyCard = loyaltyRecordsPerLocationPerson.reduce((a, {price}) => a + parseFloat(price), 0);
//     const paymentList = [sumCreditCard, sumLoyaltyCard, sumCreditCard + sumLoyaltyCard];
//     res.set(location, paymentList);
//     //console.log(paymentList);
//
//   });
//   //console.log(res);
//   return res;
// }







Promise.all([getCreditCardTransactions(), getLoyaltyCardTransactions(), getListOfPlaces(), getListOfPeople() ]).then( ([cc,lc,places,people]) => {
  // data loaded
  const mapPromise = new Promise((resolve, reject) => {
    // compute hashmaps <place name, [transaction records of the place]>
    const map = createLocation_ccTransactionMap(cc);
    const map2 = createLocation_lcTransactionMap(lc);
    resolve([map, map2]);
  });

  mapPromise.then( maps => {
    //console.log(maps[0]);
    name_ccMap = maps[0];
    name_lcMap = maps[1];

    const personTransactionSum = new Map();
    // const maxPrice = Math.max(d3.max(cc, function(d) { return d.price; }), d3.max(lc, function(d) { return d.price; })); // todo
    // console.log(maxPrice);

    createDropDown(people);
    createDropDownTime();
    drawList(places); //draws table


    people.forEach(person => {
      // console.log(person);
      const first = person.split(/\s+/)[0];
      const last = person.split(/\s+/)[1];
      const summation = getSumOfPerson(first, last, places);
      personTransactionSum.set(person, summation);

      // set to property
      allPlaces = places;
      allTransactionsOfEachPerson = personTransactionSum;
    });

    //default behavior
    drawStatGraph(personTransactionSum, places, "Cornelia Lais", "week1");

  });



// create a dropdown to select person and set property
function createDropDown(people) {
  // console.log(data);
  var dropDown = d3.select("#dropDown_trans")
    .append("div")
    .append("select")
    .attr("class", "form-control");

  dropDown.on("change", function(d) {
    currentPerson = d3.select(this).property("value");
    console.log(allTransactionsOfEachPerson);
    drawStatGraph(allTransactionsOfEachPerson, allPlaces, currentPerson, currentWeek);
  });

  dropDown.selectAll("option")
    .data(people)
    .enter()
    .append("option")
    .attr("value", function (d) {
      // console.log(d);
      return d;
    })
    .text(function (d) { return d; });
}


function createDropDownTime() {
  const weeks = ["week1", "week2", "week3"];
  const dropDown = d3.select("#dropDown_week")
    .append("div")
    .append("select")
    .attr("class", "form-control");


  dropDown.selectAll("option")
    .data(weeks)
    .enter()
    .append("option")
    .attr("value", function (d) {return d;})
    .text(function (d) { return d; });

  dropDown.on("change", function(d) {
    const week = d3.select(this).property("value");
    currentWeek = week;
    drawStatGraph(allTransactionsOfEachPerson, allPlaces, currentPerson, currentWeek);
  });


}




function drawStatGraph(personTransactionSum, places, person, week){
  // clean up dots
  if(!allTransactionsOfEachPerson || !places || !person)  return;
  d3.select("#allDots").remove();

  // draw axis
  var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1)
    .domain(places);
  var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 500]); // max value of sum TODO calculate max of sum
  /*
  * rotate text on axis part ref
  * https://stackoverflow.com/questions/11252753/rotate-x-axis-text-in-d3
  *
  * */
  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");
  chart.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y));


  //draw graph
  var data = [...personTransactionSum.get(person)];
  console.log(week);
  const allDots = chart.append("g").attr("id", "allDots");

  allDots.selectAll(".creditDots")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "creditDots")
    .attr("cx", function(d) {
      // console.log(d[1][week]);
      return x(d[0]);
    })
    .attr("cy", function(d) { return y(d[1][week][0]); })
    .attr('r', 3)
    .style("fill", COLOR.GREEN);


  allDots.selectAll(".loyaltyDots")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "loyaltyDots")
    .attr("cx", function(d) {
      // console.log(d);
      return x(d[0]);
    })
    .attr("cy", function(d) { return y(d[1][week][1]); })
    .attr('r', 3)
    .style("fill", COLOR.BLUE);


  allDots.selectAll(".sumDots")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "sumDots")
    .attr("cx", function(d) {
      // console.log(d);
      return x(d[0]);
    })
    .attr("cy", function(d) { return y(d[1][week][2]); })
    .attr('r', 3)
    .style("fill", COLOR.RED);


  // var legend = chart.append("g")
  //   .attr("class", "legend")
  //   .attr("x", width - 30)
  //   .attr("y", 30)
  //   .attr("height", 150)
  //   .attr("width", 100);

  var legend = chart
    .append("g")
    .selectAll('g').data(
    [ ['Credit card', COLOR.GREEN],
      ['Loyalty card', COLOR.BLUE],
      ['Total', COLOR.RED]]
    )
    .enter()
    .append('g')
    .each(function(d, i) {
      console.log(d);
      console.log(i);
      var g = d3.select(this);
      g.append("circle")
        .attr("cx", width - 120)
        .attr("cy", i*30)
        .attr("r", 5)
        .style("fill", d[1]);

      g.append("text")
        .attr("x", width - 100)
        .attr("y", i*30 + 5)
        .attr("height",20)
        .attr("width",150)
        // .style("fill", d)
        .text(d[0]);

    });

}







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
  d3.select("#recordsList").append("h4").text("Places of Transaction");

  var ul =
  d3.select("#recordsList")
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
      //console.log(nameOfPlace);
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