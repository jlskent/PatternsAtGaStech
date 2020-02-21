import dataAgent from './loadData.js';
import {svg, projection, timeline, xScaleWeek1, xScaleWeek2, yScale} from './main.js';
import {remove} from './util.js';

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


  console.log("drawing gps data");
  for(let i = 0; i < data.length; i++) {
    const date = data[i].Timestamp.getDate();
    if(date >= 6 && date <= 12) {
        week1data.push(data[i]); 
    } else {
        week2data.push(data[i]);
    } 
  }

  let week1ColorScale = d3.scaleSequential(d3.interpolateInferno)
                          .domain([0, week1data.length]);
  let week2ColorScale = d3.scaleSequential(d3.interpolateCool)
                          .domain([0, week2data.length]);


  let i = 0;
  const gpsGraph = svg.append('g')
    .attr("id", "gpsGraph");

  const week1Graph = gpsGraph.append('g')
    .attr("id", "week1Graph")
    .selectAll("dot")
    .data(week1data)
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
    .style("fill", function (d) {
      return week1ColorScale(i++);
    })
    .attr('fill-opacity', '0.25');


  i = 0;  
  const week2Graph = gpsGraph.append('g')
    .attr("id", "week2Graph")
    .selectAll("dot")
    .data(week2data)
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
    .style("fill", function (d) {
      return week2ColorScale(i++);
    })
    .attr('fill-opacity', '0.25');

    drawTimeline(week1data, week2data, week1Graph, week2Graph);
};



let createDropDown = (carAssignments) => {
  // console.log(data);
  var dropDown = d3.select("#dropDown")
    .append("div")
    .append("select")
    .attr("class", "form-control");

  dropDown.on("change", function(d) {
    var value = d3.select(this).property("value");
    // console.log("car id "+value);
    getCarTrackingDataById(value).then(carTrackingData => {
      drawTrackingData(carTrackingData);
    });
  });

  let i = 1;
  dropDown.selectAll("option")
    .data(carAssignments)
    .enter()
    .append("option")
    .attr("value", function (d) {
      return d.CarID;
    })
    .text(function (d) { return (i++) + ". " + d.LastName + " " + d.FirstName; });
};

function drawTimeline(week1, week2, week1Graph, week2Graph) {


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
                  .extent([[0, timelinePaddingTop * 2], [timelineWidth - 2 * timelinePadding, timelineHeight - 2 * timelinePaddingTop]])
                  .on("end", brushended);

  timeline.append("g")
          .attr('class', 'brush')
          .attr('z-index', '999')
          .call(brush);

  function brushended() {
    remove('.label');
    let selectedWeek1Length = 0, selectedWeek2Length = 0;

    const selection = d3.event.selection;
    if (!d3.event.sourceEvent || !selection) return;
    const [x1, x2] = d3.event.selection;

    week1Graph.classed("hidden", function (d) {
      const week1X = xScaleWeek1(d.Timestamp);
      if(!(week1X >= x1 && week1X <= x2)) {
        return true;
      } else {
        selectedWeek1Length++;
        return false;
      }
    });

    week2Graph.classed("hidden", function (d) {
      const week2X = xScaleWeek2(d.Timestamp);
      if(!(week2X >= x1 && week2X <= x2)) {
        return true;
      } else {
        selectedWeek2Length++;
        return false;
      }
    });

    console.log(week1.length, selectedWeek1Length, week2.length, selectedWeek2Length);
    let week1ColorScale = d3.scaleSequential(d3.interpolateInferno)
                          .domain([0, selectedWeek1Length]);
    let week2ColorScale = d3.scaleSequential(d3.interpolateCool)
                            .domain([0, selectedWeek2Length]);
    
    let i = 0;
    week1Graph.style('fill', d => {
      const week1X = xScaleWeek1(d.Timestamp);
      if(!(week1X >= x1 && week1X <= x2)) {
        return 'red';
      } else {
        if(i === 0) {
          var coord = projection([d.long, d.lat]);
          svg.append('text')
                    .attr('class', 'label week1-label')
                    .text('1S')
                    .attr('x', coord[0] + 15)
                    .attr('y', coord[1])
        } 
        if(i === selectedWeek1Length - 1) {
          var coord = projection([d.long, d.lat]);
          svg.append('text')
                    .attr('class', 'label week1-label')
                    .text('1E')
                    .attr('x', coord[0] - 25)
                    .attr('y', coord[1])
        }
        return week1ColorScale(i++);
      }
    });
    i = 0;
    week2Graph.style('fill', d => {
      const week2X = xScaleWeek2(d.Timestamp);
      if(!(week2X >= x1 && week2X <= x2)) {
        return 'red';
      } else {
        if(i === 0) {
          var coord = projection([d.long, d.lat]);
          svg.append('text')
                    .attr('class', 'label week2-label')
                    .text('2S')
                    .attr('x', coord[0] - 8)
                    .attr('y', coord[1] + 15)
        } 
        if(i === selectedWeek2Length - 1) {
          var coord = projection([d.long, d.lat]);
          svg.append('text')
                    .attr('class', 'label week2-label')
                    .text('2E')
                    .attr('x', coord[0] - 8)
                    .attr('y', coord[1] - 15)
        }
        return week2ColorScale(i++);
      }
    });
  }
}



