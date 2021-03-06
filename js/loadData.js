// svg set up

import { filterNaN, processDate } from './util.js';

const dataPromise = new Promise((resolve, reject) => {
  d3.queue()
    .defer(d3.csv, "data/assignment2/car-assignments.csv")
    .defer(d3.csv, "data/assignment2/gps.csv")
    .defer(d3.csv, "data/assignment2/loyalty_data.csv")
    .defer(d3.csv, "data/assignment2/cc_data.csv")
    .defer(d3.json, "data/assignment2/Geospatial/Aliba.geojson")
  //  .defer(d3.json, "data/assignment2/Geospatial/Kronos_Island.geojson")

    .await(function(error, data1, data2, data3, data4, data5) {
      if (error) reject(error);
      const carAssignmentData = data1;
      const carTrackingData = processDate(filterNaN(data2));
      const loyaltyCardTransactionData = data3;
      const creaditCardTransactionData = data4;
      const alibaJson = data5;
      //const KronosJson = data6;

      const data = {
        carAssignmentData,
        carTrackingData,
        loyaltyCardTransactionData,
        creaditCardTransactionData,
        alibaJson,
       // KronosJson
      };

      resolve(data);

    });
});


// get all car-assignments
function getAllCarAssignments() {
  return dataPromise.then(data => data.carAssignmentData).catch(e => "No data fetched.");
}

// get car by id
function getCarTrackingDataById(id) {
  return dataPromise.then(data => {
    return data.carTrackingData.filter(row => row.id === id)
  }).catch(e => "No data fetched.");
}

// get car data
function getCarTrackingData() {
  return dataPromise.then(data => data.carTrackingData).catch(e => "No data fetched.");
}


function getAlibaData() {
  return dataPromise.then(data => data.alibaJson).catch(e => "No data fetched.");
}


function getLoyaltyCardTransactions() {

  return dataPromise.then(data => data.loyaltyCardTransactionData).catch(e => "No data fetched.");
}


function getCreditCardTransactions() {

  return dataPromise.then(data => data.creaditCardTransactionData).catch(e => "No data fetched.");
}


function getListOfPlaces() {

  return dataPromise.then(data => {
    var listOfPlaces = [];
    data.loyaltyCardTransactionData.forEach(row => listOfPlaces.push(row.location));
    data.creaditCardTransactionData.forEach(row => listOfPlaces.push(row.location));
    listOfPlaces = listOfPlaces.filter((item, i, array) => array.indexOf(item) == i);
    return listOfPlaces;
  }).catch(
    e => console.log(" failed to load data")
  );
}



function getListOfPeople() {

  return dataPromise.then(data => {
    var listOfPeople = [];
    data.loyaltyCardTransactionData.forEach(row => listOfPeople.push(row.FirstName + " " + row.LastName));
    data.creaditCardTransactionData.forEach(row => listOfPeople.push(row.FirstName + " " + row.LastName));
    listOfPeople = listOfPeople.filter((item, i, array) => array.indexOf(item) == i);
    return listOfPeople;
  }).catch(
    e => console.log(" failed to load data")
  );
}




const dataAgent = {
  getAllCarAssignments,
  getCarTrackingDataById,
  getCarTrackingData,
  getAlibaData,
  getLoyaltyCardTransactions,
  getCreditCardTransactions,
  getListOfPlaces,
  getListOfPeople,
};

export default dataAgent;




// carTrackingData




// export default {newName} ;



