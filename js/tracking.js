import dataAgent from './loadData.js';
import {svg, projection} from './main.js';

const {getAllCarAssignments, getCarTrackingDataById} = dataAgent;

// buttons
d3.select('#btn1')
  .on('click', function()
  {

  });
d3.select('#btn2')
  .on('click', function()
  {

  });

var carTrackingSelect = svg.append("g");
getAllCarAssignments().then(data => createDropDown(data));

function drawTrackingData(data) {
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

let createDropDown = (carAssignments) => {
  // console.log(data);
  var dropDown = d3.select("#dropDown")
    .append("div")
    .append("select");

  dropDown.on("change", function(d) {
    var value = d3.select(this).property("value");
    console.log("car id "+value);
    getCarTrackingDataById(value).then(carTrackingData => {
    	drawTrackingData(carTrackingData);
    });    
  });

  dropDown.selectAll("option")
    .data(carAssignments)
    .enter()
    .append("option")
    .attr("value", function (d) {
      return d.CarID;
    })
    .text(function (d) { return d.LastName + " " + d.FirstName; });
};

