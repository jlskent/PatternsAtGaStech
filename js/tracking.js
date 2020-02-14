import dataAgent from './loadData.js';
import {svg, projection, timeline} from './main.js';

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

getAllCarAssignments().then(data => createDropDown(data));




function drawTrackingData(data) {
  d3.select("#gpsGraph").remove();


  const week1data = [];
  const week2data = [];

  console.log("drawing gps data");
  svg.append('g')
    .attr("id", "gpsGraph")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => {
      // console.log("traking");
      // console.log([d.long, d.lat]);

      // console.log(projection([d.long, d.lat]));
      // console.log(projection([36.076225, 24.87468932]));
      

      var coord = projection([d.long, d.lat]);
      // if(new Date(d.Timestamp).ge)
      // console.log(coord);
      return coord[0];
    })
    .attr("cy", (d) =>{
      var coord = projection([d.long, d.lat]);
      return coord[1];
    })
    .attr("r", 2)
    .attr("z-index", "9")
    .style("fill", (d) => { 
      const date = d.Timestamp.getDate();
      if(date >= 6 && date <= 12) {
        week1data.push(d);
        return 'red';
      } else {
        week2data.push(d);
        return 'blue';
      }
    })
    .attr('fill-opacity', '0.25');

    drawTimeline(week1data, week2data);
};



let createDropDown = (carAssignments) => {
  // console.log(data);
  var dropDown = d3.select("#dropDown")
    .append("div")
    .append("select");

  dropDown.on("change", function(d) {
    var value = d3.select(this).property("value");
    // console.log("car id "+value);
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

function drawTimeline(week1, week2) {
  console.log(week1, week2);

}
