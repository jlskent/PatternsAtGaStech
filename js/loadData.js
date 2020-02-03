// svg set up

var carAssignmentData = [];
var carTrackingData = [];
var loyaltyCardTransactionData = [];
var creaditCardTransactionData = [];

var alibaJson = [];
var KronosJson = [];






var margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = 1000 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
  // .attr("id", )
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);


var carTrackingSelect = svg.select("svg");



function filterNan(rows) {
  filteredRows = rows.filter(function(d){
    if(isNaN(d.lat) || isNaN(d.long))  return false;
    else return true;
  });
  return filteredRows;
}




d3.queue()
  .defer(d3.csv, "data/assignment2/car-assignments.csv")
  .defer(d3.csv, "data/assignment2/gps.csv")
  .defer(d3.csv, "data/assignment2/loyalty_data.csv")
  .defer(d3.csv, "data/assignment2/cc_data.csv")
  .defer(d3.json, "data/assignment2/Geospatial/Aliba.geojson")
  .defer(d3.json, "data/assignment2/Geospatial/Kronos_Island.geojson")

  .await(function(error, data1, data2, data3, data4, data5, data6) {
    if (error) throw error;
    carAssignmentData = data1;
    carTrackingData = data2.slice(1000);
    // carTrackingData = carTrackingData.slice(1000);
    carTrackingData = filterNan(carTrackingData);

    loyaltyCardTransactionData = data3;
    creaditCardTransactionData = data4;
    alibaJson = data5;
    KronosJson = data6;
    console.log(carAssignmentData[0]);    // first row of car assignments
    console.log(carTrackingData);    // first row of car assignments
    console.log(loyaltyCardTransactionData[0]);    // first row of car assignments
    console.log(creaditCardTransactionData[0]);  // first row of credit car
    console.log(alibaJson);  // first row of credit car
    // valid
    var projection = d3.geoMercator();
    var path = d3.geoPath(projection);
    projection.fitSize([width, height], alibaJson);


    svg.append("g")
      .selectAll("path")
      .data(alibaJson.features)
      .enter()
      .append("path")
      .attr("d", feature => path(feature))
      .style("stroke", "black")
      .style("stroke-width", "3")
      .style("fill", (d) => {
        return "rgb(213,222,217)";
      });





    let drawTrackingData  = (data) => {
      // console.log(data);
      console.log("drawing gps data");
      svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => {
          var coord = projection([d.long, d.lat]);
          return coord[0];
        })
        .attr("cy", (d) =>{
          var coord = projection([d.long, d.lat]);
          return coord[1];
        })
        .attr("r", 2)
        // .style("stroke", "red")
        .style("fill", (d) => { return "red"})
        // .style("fill", "#69b3a2")
    };



    drawTrackingData(carTrackingData);




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












// carTrackingData







