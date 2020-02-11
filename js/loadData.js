// svg set up

// const newName = "some name";


// variables
var carAssignmentData = [];
var carTrackingData = [];
var loyaltyCardTransactionData = [];
var creaditCardTransactionData = [];
var alibaJson = [];
var KronosJson = [];

// path for geojson
var projection = d3.geoMercator();
var path = d3.geoPath(projection);



//canvas and selectors
var margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = 1000 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
  // .attr("id", )
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

var carTrackingSelect = svg.append("g");



// buttons
d3.select('#btn1')
  .on('click', function()
  {

  });
d3.select('#btn2')
  .on('click', function()
  {

  });




// functions

// function createDropDown (carAssignmentData)  {
//   // console.log(data);
//   var dropDown = d3.select("#dropDown")
//     .append("div")
//     .append("select");
//
//   dropDown.on("change", function(d) {
//       var value = d3.select(this).property("value");
//       // var value = d3.select(this).select.data;
//
//       console.log("car id "+value);
//       // console.log(d3.select(this).select);
//       // console.log(d3.select(this).select._data);
//       // console.log(d3.select(this).toString());
//       // alert(value);
//       console.log(window.carTrackingData.length);
//
//       const newCarTrackingData = window.carTrackingData.filter(
//         function(row) {
//           if (row.CarID == value) return true;
//           return false;
//         }
//       );
//       console.log(window.carTrackingData.length);
//
//       window.carTrackingData = newCarTrackingData;
//       console.log(window.carTrackingData.length);
//
//       // console.log(this.carTrackingData.length);
//       drawTrackingData(newCarTrackingData);
//     });
//
//   dropDown.selectAll("option")
//     .data(carAssignmentData)
//     .enter()
//     .append("option")
//     .attr("value", function (d) {
//       // console.log("option ");
//       // console.log(d);
//       // console.log(d.CarID);
//       return d.CarID;
//       // const fullName = d.LastName + d.FirstName;
//       // console.log(d);
//       // return fullName;
//     })
//     .text(function (d) { return d.LastName + d.FirstName; });
// }



function filterNan(rows) {
  var filteredRows;
  filteredRows = rows.filter(function(d){
    if(isNaN(d.lat) || isNaN(d.long))  return false;
    else return true;
  });
  return filteredRows;
}






function drawTrackingData(data) {
  // console.log(data);
  d3.select("#gpsGraph").remove();

  console.log("drawing gps data");
  carTrackingSelect.append('g')
    .attr("id", "gpsGraph")
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




function drawBaseMap(alibaData){
  svg.append("g")
    .selectAll("path")
    .data(alibaData)
    .enter()
    .append("path")
    .attr("d", feature => path(feature))
    .style("stroke", "black")
    .style("stroke-width", "3")
    .style("fill", (d) => {
      return "rgb(213,222,217)";
    })
  // .on("mouseover", function(d) {
  // console.log(d);
  // tip.show()
  // toolTip.transition()
  //        .duration(300)
  //        .style("opacity", 1);
  // toolTip.html(d =>
  //   console.log(d.geometry)
  //
  // )
  // .style("left", (d3.event.pageX) + "px")
  // .style("top", (d3.event.pageY - 28) + "px");
  // })
  // .on("mouseout", function(d) {
  //   toolTip.transition()
  //          .duration(300)
  //          .style("opacity", 0);
  // })
  ;
}





// main

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
    // console.log(window.carTrackingData.length);
    // window.carTrackingData = data2.slice(0, 1000);
    // console.log(window.carTrackingData.length);
    carTrackingData = data2;


    carTrackingData = carTrackingData.slice(0, 8000);
    carTrackingData = filterNan(carTrackingData);
    loyaltyCardTransactionData = data3;
    creaditCardTransactionData = data4;
    alibaJson = data5;
    KronosJson = data6;
    // console.log(carAssignmentData[0]);    // first row of car assignments
    // console.log(carTrackingData);    // first row of car assignments
    // console.log(loyaltyCardTransactionData[0]);    // first row of car assignments
    // console.log(creaditCardTransactionData[0]);  // first row of credit car
    // console.log(alibaJson);  // first row of credit car
    // valid
    // var projection = d3.geoMercator();
    projection.fitSize([width, height], alibaJson);
    drawBaseMap(alibaJson.features);
    drawTrackingData(carTrackingData);



    if(carAssignmentData && carAssignmentData.length > 0){
      // createDropDown(window.carAssignmentData);

      let createDropDown = (carAssignmentData) => {
        // console.log(data);
        var dropDown = d3.select("#dropDown")
          .append("div")
          .append("select");

        dropDown.on("change", function(d) {
          var value = d3.select(this).property("value");
          console.log("car id "+value);
          console.log(carTrackingData.length);
          const newCarTrackingData = carTrackingData.filter(
            function(row) {
              if (row.id == value) return true;
              return false;
            }
          );
          // carTrackingData = newCarTrackingData;
          console.log(carTrackingData.length);
          drawTrackingData(newCarTrackingData);
        });

        dropDown.selectAll("option")
          .data(carAssignmentData)
          .enter()
          .append("option")
          .attr("value", function (d) {
            return d.CarID;
          })
          .text(function (d) { return d.LastName + " " + d.FirstName; });
      };
      createDropDown(carAssignmentData);
    }









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




// export default {newName} ;



