// svg set up

import { filterNaN } from './util.js';

const dataPromise = new Promise((resolve, reject) => {
  d3.queue()
    .defer(d3.csv, "data/assignment2/car-assignments.csv")
    .defer(d3.csv, "data/assignment2/gps.csv")
    .defer(d3.csv, "data/assignment2/loyalty_data.csv")
    .defer(d3.csv, "data/assignment2/cc_data.csv")
    .defer(d3.json, "data/assignment2/Geospatial/Aliba.geojson")
    .defer(d3.json, "data/assignment2/Geospatial/Kronos_Island.geojson")

    .await(function(error, data1, data2, data3, data4, data5, data6) {
      if (error) reject(error);
      const carAssignmentData = data1;
      const carTrackingData = filterNaN(data2);
      const loyaltyCardTransactionData = data3;
      const creaditCardTransactionData = data4;
      const alibaJson = data5;
      const KronosJson = data6;

      const data = {
        carAssignmentData,
        carTrackingData,
        loyaltyCardTransactionData,
        creaditCardTransactionData,
        alibaJson,
        KronosJson
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

function getAlibaData() {
  return dataPromise.then(data => data.alibaJson).catch(e => "No data fetched.");
}


function getLoyaltyCardTransactions() {

  return dataPromise.then(data => data.loyaltyCardTransactionData).catch(e => "No data fetched.");
}


function getCreditCardTransactions() {
  return dataPromise.then(data => data.creaditCardTransactionData).catch(e => "No data fetched.");
}


const dataAgent = {
  getAllCarAssignments,
  getCarTrackingDataById,
  getAlibaData,
  getLoyaltyCardTransactions,
  getCreditCardTransactions
};

export default dataAgent;




// carTrackingData




// export default {newName} ;



