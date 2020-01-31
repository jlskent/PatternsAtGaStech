// svg set up

var carAssignmentData = [];
var carTrackingData = [];
var loyaltyCardTransactionData = [];
var creaditCardTransactionData = [];

var alibaJson = []
var KronosJson = []




var margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = 3000 - margin.left - margin.right,
  height = 1500 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);


d3.queue()
  .defer(d3.csv, "data/assignment2/car-assignments.csv")
  .defer(d3.csv, "data/assignment2/gps.csv")
  .defer(d3.csv, "data/assignment2/loyalty_data.csv")
  .defer(d3.csv, "data/assignment2/cc_data.csv")
  .defer(d3.json, "data/assignment2/Geospatial/Aliba.geojson")
  .defer(d3.json, "data/assignment2/Geospatial/Kronos_Island.geojson")

  .await(function(error, data1, data2, data3, data4, data5, data6) {
    if (error) throw error
    carAssignmentData = data1;
    carTrackingData = data2;
    loyaltyCardTransactionData = data3;
    creaditCardTransactionData = data4;
    alibaJson = data5;
    KronosJson = data6;
    console.log(carAssignmentData[0]);    // first row of car assignments
    console.log(carTrackingData[0]);    // first row of car assignments
    console.log(loyaltyCardTransactionData[0]);    // first row of car assignments
    console.log(creaditCardTransactionData[0]);  // first row of credit car
    console.log(alibaJson);  // first row of credit car
    //
    var projection = d3.geoMercator().fitSize([width, height], alibaJson);
    // var projection = d3.geoEquirectangular();

    // var projection = d3.geoAlbersUsa();
    var path = d3.geoPath(projection);

    svg.selectAll("path")
      .data(alibaJson.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("stroke", "black")
      .style("stroke-width", "5")
      .style("fill", (d) => {
        return "rgb(213,222,217)";
      })

    ;

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


















