// svg set up

var carAssignmentData = [];
var carTrackingData = [];
var loyaltyCardTransactionData = [];
var creaditCardTransactionData = [];




d3.queue()
  .defer(d3.csv, "data/assignment2/car-assignments.csv")
  .defer(d3.csv, "data/assignment2/gps.csv")
  .defer(d3.csv, "data/assignment2/loyalty_data.csv")
  .defer(d3.csv, "data/assignment2/cc_data.csv")
  .await(function(error, data1, data2, data3, data4) {
    if (error) throw error
    carAssignmentData = data1;
    carTrackingData = data2;
    loyaltyCardTransactionData = data3;
    creaditCardTransactionData = data4;
    console.log(carAssignmentData[0]);    // first row of car assignments
    console.log(carTrackingData[0]);    // first row of car assignments
    console.log(loyaltyCardTransactionData[0]);    // first row of car assignments
    console.log(creaditCardTransactionData[0]);  // first row of credit car
  });


// use this only for v5
// Promise.all([
//   d3.csv("data/assignment2/car-assignments.csv"),
//   d3.csv("data/assignment2/gps.csv"),
//   d3.csv("data/assignment2/loyalty_data.csv"),
//   d3.csv("data/assignment2/cc_data.csv"),
//
// ]).then(function(data) {
//   console.log(data);  // first row of car assignments
//
//   carAssignmentData = data[0];
//   carTrackingData = data[1];
//   loyaltyCardTransactionData = data[2];
//   cardTransactionData = data[3];
//
//   console.log(data[0][0])  // first row of car assignments
//   console.log(data[1][0])  // first row of credit car
// });


















