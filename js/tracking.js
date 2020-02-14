import dataAgent from './loadData.js';
import {svg, projection, timeline, xScaleWeek1, xScaleWeek2, yScale} from './main.js';

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

  const week1TimelineGraph = document.querySelector('.week1data');
  const week2TimelineGraph = document.querySelector('.week2data');
  const brush = document.querySelector('.brush');

  if(week1TimelineGraph) {
    week1TimelineGraph.remove();
  }
  if(week2TimelineGraph) {
    week2TimelineGraph.remove();
  }
  if(brush) {
    brush.remove();
  }

  const week1data = [];
  const week2data = [];
  let count = 0;

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
      count++;
      const date = d.Timestamp.getDate();
      if(date >= 6 && date <= 12) {
        if(count === 10) {
          week1data.push(d); 
          count = 0;
        }
        return 'red';
      } else {
        if(count === 10) {
          week2data.push(d);
          count = 0;
        }
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


  timeline.append("g")
          .attr("class", "week1data")
          .selectAll('rect')
          .data(week1)
          .enter()
          .append('rect')
          .attr('height', '4')
          .attr('width', '1')
          .style('fill', 'red')
          .attr('x', d => xScaleWeek1(d.Timestamp))
          .attr('y', yScale(0.4));

  timeline.append("g")
          .attr("class", "week2data")
          .selectAll('circle')
          .data(week2)
          .enter()
          .append('circle')
          .attr('r', '2')
          .style('fill', 'blue')
          .attr('cx', d => xScaleWeek2(d.Timestamp))
          .attr('cy', yScale(0.8));
const timelinePadding = 40;
const timelinePaddingTop = 20;
const timelineWidth = 910;
const timelineHeight = 200;

const brush = d3.brushX()
                .extent([[timelinePadding, timelinePaddingTop], [timelineWidth - 2 * timelinePadding, timelineHeight - 2 * timelinePaddingTop]])
                .on("end", brushended);

timeline.append("g")
        .attr('class', 'brush')
        .attr('z-index', '999')
        .call(brush);
}

function brushended() {
  const selection = d3.event.selection;
  if (!d3.event.sourceEvent || !selection) return;
  console.log(123);

  
}
